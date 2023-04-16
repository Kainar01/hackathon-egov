import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import _ from 'lodash';
import moment from 'moment';

import { ServerConfig } from '@/config/server.config';
import { PrismaService } from '@/prisma';

import { EgovApiService } from '../egov-api/egov-api.service';
import { Role } from '../user/user.enum';
import { UserService } from '../user/user.service';
import type { VerificationConfirmDto } from './dto/verificationConfirm.dto';
import type { VerificationSendDto } from './dto/verificationSend.dto';
import type { JwtPayload, UserPayload } from './interface/auth.interface';
import type { LoginResponse } from './interface/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly egovApi: EgovApiService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  public async sendVerification({ phoneNumber }: VerificationSendDto): Promise<{ verificationId: number }> {
    const code = this.generateCode();
    const verification = await this.prisma.verification.create({
      data: {
        code,
        phone: phoneNumber,
      },
    });
    await this.egovApi.sendSMS({ phone: phoneNumber, smsText: code });
    return { verificationId: verification.id };
  }

  public async confirmVerification(res: Response, { verificationId, verificationCode }: VerificationConfirmDto): Promise<LoginResponse> {
    const verification = await this.prisma.verification.findFirst({ where: { code: verificationCode, id: verificationId } });
    if (!verification) {
      throw new BadRequestException('Невалидный код');
    }
    const user = await this.prisma.user.findFirstOrThrow({ where: { phone: verification.phone }, include: { userRoles: true } });

    const roles = <Role[]>_.map(user.userRoles, 'role');
    const payload: UserPayload = { userId: user.id, roles };

    if (roles.includes(Role.CARRIER)) {
      const carrier = await this.prisma.carrier.findFirst({ where: { userId: user.id } });
      payload.carrierId = carrier?.id;
    }
    if (roles.includes(Role.PROVIDER_OWNER)) {
      const providerOwner = await this.prisma.carrier.findFirst({ where: { userId: user.id } });
      payload.providerOwnerId = providerOwner?.id;
    }

    const accessToken = await this.setAuthCookie(res, payload);
    return {
      user: {
        userId: user.id,
        roles,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        iin: user.iin,
        middleName: user.middleName,
      },
      token: accessToken,
    };
  }

  public async setAuthCookie(res: Response, { userId, ...user }: UserPayload): Promise<string> {
    const payload: JwtPayload = { sub: userId, ...user };
    const accessToken = await this.jwt.signAsync(payload);

    const cookieOpts = {
      httpOnly: true,
      secure: ServerConfig.JWT_COOKIE_SECURE,
      expires: moment().add(1, 'year').toDate(),
    };

    res.cookie('access_token', accessToken, cookieOpts);
    res.cookie('user_id', userId, cookieOpts);
    return accessToken;
  }

  public async clientSendVerification(iin: string): Promise<{ verificationId: number }> {
    const { phone, isExists } = await this.egovApi.getPhone(iin);
    if (!isExists) {
      throw new BadRequestException('К этому ИИН-у не привязан номер');
    }
    const code = this.generateCode();
    await this.userService.createByIIN(iin);
    const verification = await this.prisma.verification.create({
      data: {
        code,
        phone,
      },
    });

    await this.egovApi.sendSMS({ phone, smsText: code });
    return { verificationId: verification.id };
  }

  public async clientConfirmVerification(
    res: Response,
    { verificationId, verificationCode }: VerificationConfirmDto,
  ): Promise<LoginResponse> {
    const verification = await this.prisma.verification.findFirst({ where: { code: verificationCode, id: verificationId } });
    if (!verification) {
      throw new BadRequestException('Невалидный код');
    }
    const user = await this.prisma.user.findFirst({ where: { phone: verification.phone }, include: { userRoles: true } });
    if (!user) {
      throw new BadRequestException('Не существует юзера с данным телефоном номера');
    }
    const roles = <Role[]>_.map(user.userRoles, 'role');

    const accessToken = await this.setAuthCookie(res, { userId: user.id, roles });
    return {
      user: {
        userId: user.id,
        roles,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        iin: user.iin,
        middleName: user.middleName,
      },
      token: accessToken,
    };
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
