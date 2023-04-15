import { IsNotEmpty, IsString } from 'class-validator';

export class SmsDataDto {
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsNotEmpty()
  @IsString()
  smsText!: string;
}
