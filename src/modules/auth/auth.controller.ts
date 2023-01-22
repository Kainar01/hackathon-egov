import { Controller, Get, Post, Res, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { ReqUser } from '@/common/decorators/req-user.decorator';

import type { JwtSign, UserPayload } from './auth.interface';
import { AuthService } from './auth.service';
import { ConfirmAuthVerificationBodyDto } from './dto/confirm-auth-verification.body.dto';
import { ConfirmAuthVerificationResponseDto } from './dto/confirm-auth-verification.response.dto';
import { SendAuthVerificationBodyDto } from './dto/send-auth-verification.body.dto';
import { SendAuthVerificationResponseDto } from './dto/send-auth-verification.response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtVerifyGuard } from './guards/jwt-verify.guard';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('/verification/confirm')
  @ApiResponse({ type: ConfirmAuthVerificationResponseDto, status: 200 })
  public async confirmVerification(@Body() data: ConfirmAuthVerificationBodyDto): Promise<ConfirmAuthVerificationResponseDto> {
    return this.auth.confirmVerification(data);
  }

  @Post('/verification/send')
  @ApiResponse({ type: SendAuthVerificationResponseDto, status: 200 })
  public async sendVerification(@Body() data: SendAuthVerificationBodyDto): Promise<SendAuthVerificationResponseDto> {
    return this.auth.sendVerification(data);
  }

  @Get('logout')
  public logout(@Res({ passthrough: true }) res: Response): void {
    this.auth.removeAuthCookie(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt/check')
  public jwtCheck(@ReqUser() user: UserPayload): UserPayload {
    return user;
  }

  // Only verify is performed without checking the expiration of the access_token.
  @UseGuards(JwtVerifyGuard)
  @Post('jwt/refresh')
  public jwtRefresh(@ReqUser() user: UserPayload, @Req() req: Request, @Res({ passthrough: true }) res: Response): void {
    const refresh = (<Partial<JwtSign>>req.cookies).refresh_token;

    if (!refresh || !this.auth.validateRefreshToken(user, refresh)) {
      throw new UnauthorizedException('InvalidRefreshToken');
    }

    this.auth.setAuthCookie(res, user);
  }
}
