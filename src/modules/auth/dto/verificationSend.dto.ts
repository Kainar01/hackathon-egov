import { IsNotEmpty, IsString } from 'class-validator';

export class VerificationSendDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;
}
