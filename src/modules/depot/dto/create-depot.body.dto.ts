import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateIf } from 'class-validator';

export class CreateDepotBodyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ValidateIf((dto) => dto.allowOrder)
  @IsNumber()
  @IsNotEmpty()
  buyerFee?: number;

  @IsBoolean()
  @IsNotEmpty()
  allowOrder!: boolean;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  zip!: string;
  
  @IsString()
  @IsNotEmpty()
  phone!: string;
  
  @IsNumber()
  @IsPositive()
  cityId!: number;

  @IsNumber()
  lat!: number;

  @IsNumber()
  lng!: number;
}
