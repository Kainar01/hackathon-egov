import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { clientSendVerificationDto } from './dto/client-send-verification.dto';
import { VerificationConfirmDto } from './dto/verificationConfirm.dto';
import { VerificationSendDto } from './dto/verificationSend.dto';
import { LoginResponse } from './interface/login.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/client/verification/send')
  public async clientSendVerification(@Body() data: clientSendVerificationDto): Promise<{ verificationId: number }> {
    return this.authService.clientSendVerification(data.iin);
  }

  @Post('/verification/send')
  public async sendVerification(@Body() data: VerificationSendDto): Promise<{ verificationId: number }> {
    return this.authService.sendVerification(data);
  }

  @Post('/verification/confirm')
  public async confirmVerification(
    @Body() data: VerificationConfirmDto,
      @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    return this.authService.confirmVerification(res, data);
  }

  @Post('client/verification/confirm')
  public async clientConfirmVerification(
    @Body() data: VerificationConfirmDto,
      @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    return this.authService.clientConfirmVerification(res, data);
  }
}
