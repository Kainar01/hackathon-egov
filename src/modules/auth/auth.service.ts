import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';
import moment from 'moment';
import type { EntityManager, Repository } from 'typeorm';

import { UtilService } from '@/common/providers/util.service';
import { ServerConfig } from '@/config/server.config';
import { UserEntity } from '@/modules/user/entities/user.entity';

import type { User } from '../user/interfaces/user.interface';
import { VerificationService } from '../verification/verification.service';
import type { JwtPayload, JwtSign, UserPayload } from './auth.interface';
import type { ConfirmAuthVerificationBodyDto } from './dto/confirm-auth-verification.body.dto';
import type { ConfirmAuthVerificationResponseDto } from './dto/confirm-auth-verification.response.dto';
import type { SendAuthVerificationBodyDto } from './dto/send-auth-verification.body.dto';
import type { SendAuthVerificationResponseDto } from './dto/send-auth-verification.response.dto';
import type { SignupBodyDto } from './dto/signup.body.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly utils: UtilService,
    private readonly verification: VerificationService,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {}

  public async createUser({ verificationId, ...data }: SignupBodyDto, em?: EntityManager): Promise<UserEntity> {
    const entityManager = em || this.userRepository.manager;

    const verification = await this.verification.getVerificationById(verificationId);

    if (!verification?.isVerified) throw new BadRequestException('Аккаунт не верифицирован');

    const { phone } = verification;

    const exists = await this.userRepository.findOne({
      where: [{ email: data.email }, { phone }],
    });

    if (exists) throw new ConflictException('User already exists');

    const user = entityManager.create(UserEntity, { ...data, phone });
    user.password = await this.hashPassword(user.password);

    return entityManager.save(UserEntity, user);
  }

  public async sendVerification(data: SendAuthVerificationBodyDto): Promise<SendAuthVerificationResponseDto> {
    const phone = this.utils.parsePhoneNumber(data.phone, data.countryCode);

    const user = await this.userRepository.findOne({ where: { phone: phone.international } });

    if (user) {
      throw new ConflictException('Данный телефон уже привязан к другому аккаунту');
    }

    return this.verification.sendVerification(phone.international, phone.countryCode);
  }

  public async confirmVerification(data: ConfirmAuthVerificationBodyDto): Promise<ConfirmAuthVerificationResponseDto> {
    return this.verification.confirmVerification(data.verificationId, data.code);
  }

  public async validateUser(user: Pick<User, 'password'> | undefined, password: string): Promise<void> {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }
  }

  public validateRefreshToken(data: UserPayload, refreshToken: string): boolean {
    if (!this.jwt.verify(refreshToken, { secret: ServerConfig.JWT_REFRESH_SECRET })) {
      return false;
    }

    const payload = <{ sub: string }> this.jwt.decode(refreshToken);
    return Number(payload.sub) === data.userId;
  }

  public jwtSign(data: UserPayload): JwtSign {
    const payload: JwtPayload = { sub: data.userId, role: data.role, depotStaffId: data.depotStaffId };

    return {
      access_token: this.jwt.sign(payload),
      refresh_token: this.getRefreshToken(payload.sub),
    };
  }

  public setAuthCookie(res: Response, user: UserPayload): void {
    const token = this.jwtSign(user);

    const cookieOpts = {
      httpOnly: true,
      secure: ServerConfig.JWT_COOKIE_SECURE,
      expires: moment().add(1, 'year').toDate(),
    };

    res.cookie('access_token', token.access_token, cookieOpts);
    res.cookie('refresh_token', token.refresh_token, cookieOpts);
    res.cookie('user_id', user.userId, cookieOpts);
  }

  public jwtVerify(token: string): JwtPayload {
    return this.jwt.verify(token);
  }

  public removeAuthCookie(res: Response): void {
    res.cookie('access_token', '', { maxAge: 0 });
    res.cookie('refresh_token', '', { maxAge: 0 });
    res.cookie('user_id', '', { maxAge: 0 });
  }

  private getRefreshToken(sub: number): string {
    return this.jwt.sign(
      { sub },
      {
        secret: ServerConfig.JWT_REFRESH_SECRET,
        expiresIn: `${ServerConfig.JWT_SECRET_TTL_IN_DAYS} days`,
      },
    );
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
