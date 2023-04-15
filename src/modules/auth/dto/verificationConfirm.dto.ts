import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerificationConfirmDto {
  @IsNotEmpty()
  @IsString()
  verificationCode!: string;

  @IsNotEmpty()
  @IsNumber()
  verificationId!: number;
}
