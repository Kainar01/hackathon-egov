import { Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class SignupBodyDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => (<string>value).toLowerCase().trim())
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  iin?: string;

  @IsString()
  @IsOptional()
  whatsapp?: string;

  @IsNumber()
  @IsOptional()
  cityId?: number;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsUUID()
  @IsNotEmpty()
  verificationId!: string;
}
