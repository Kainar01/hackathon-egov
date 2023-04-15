/* eslint-disable max-classes-per-file */
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class AddressDto {
  @IsOptional()
  @IsNumber()
  public id?: number;

  @IsString()
  public region!: string;

  @IsString()
  public city!: string;

  @IsString()
  public street!: string;

  @IsString()
  public houseNumber!: string;

  @IsString()
  public apartment!: string;

  @IsString()
  public floor!: string;

  @IsString()
  public entrance!: string;

  @IsString()
  public block!: string;

  @IsString()
  public name!: string;

  @IsOptional()
  @IsString()
  public comments?: string;

  @IsNumber()
  public lat!: Decimal;

  @IsNumber()
  public lng!: Decimal;
}

class TrustedUserDto {
  @IsString()
  public phone!: string;

  @IsString()
  public iin!: string;
}

export class OrderDeliveryBody {
  @IsNumber()
  public userRequestId!: number;

  @IsNumber()
  public carrierProviderId!: number;

  @IsString()
  public phone!: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  public address!: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TrustedUserDto)
  public trustedUser?: TrustedUserDto | null;
}
