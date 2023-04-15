import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import moment from 'moment';

import { ServerConfig } from '@/config/server.config';
import { PrismaService } from '@/prisma';

import { EgovApiService } from '../egov-api/egov-api.service';
import type { VerificationConfirmDto } from './dto/verificationConfirm.dto';
import type { VerificationSendDto } from './dto/verificationSend.dto';
import type { JwtPayload, UserPayload } from './interface/auth.interface';
import type { LoginResponse } from './interface/login.response';

@Injectable()
export class AuthService {
  constructor(private readonly egovApi: EgovApiService, private readonly jwt: JwtService, private readonly prisma: PrismaService) {}

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
    const user = await this.prisma.user.findFirstOrThrow({ where: { phone: verification.phone } });

    const userRole = await this.prisma.userRole.findFirst({ where: { userId: user.id, OR: [{ role: 'admin' }, { role: 'operator' }] } });
    if (!userRole) {
      throw new BadRequestException('Нет доступа');
    }
    await this.setAuthCookie(res, { userId: user.id, role: userRole.role });
    return { userId: user.id, role: userRole.role };
  }

  public async setAuthCookie(res: Response, user: UserPayload): Promise<void> {
    const payload: JwtPayload = { sub: user.userId, role: user.role };
    const accessToken = await this.jwt.signAsync(payload);

    const cookieOpts = {
      httpOnly: true,
      secure: ServerConfig.JWT_COOKIE_SECURE,
      expires: moment().add(1, 'year').toDate(),
    };

    res.cookie('access_token', accessToken, cookieOpts);
    res.cookie('user_id', user.userId, cookieOpts);
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
