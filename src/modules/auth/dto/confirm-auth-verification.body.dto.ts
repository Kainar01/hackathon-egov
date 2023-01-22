import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ConfirmAuthVerificationBodyDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsUUID()
  @IsNotEmpty()
  verificationId!: string;
}
