import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ConfirmVerificationBodyDto {
  @IsString()
  @IsNotEmpty()
  smsCode!: string;

  @IsUUID()
  @IsNotEmpty()
  verificationId!: string;
}
