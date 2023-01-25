import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class ParcelItemDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsInt()
  @IsNotEmpty()
  quantity!: number;

  @IsNumber()
  @IsNotEmpty()
  price!: number;
}

export class CreateParcelBodyDto {
  @IsString()
  @IsNotEmpty()
  trackingCode!: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @ArrayNotEmpty({ message: 'Добавьте как минимум одну вещь' })
  @ValidateNested({ each: true })
  @Type(() => ParcelItemDto)
  items!: ParcelItemDto[];
}
