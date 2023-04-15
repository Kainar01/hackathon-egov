import { IsNumber, IsString } from 'class-validator';

export class CreateCarrierDto {
  @IsString()
  phone!: string;
  @IsNumber()
  providerId!: number;
  @IsString()
  firstName!: string;
  @IsString()
  lastName!: string;
}
