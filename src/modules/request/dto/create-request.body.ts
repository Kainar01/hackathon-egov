/* eslint-disable max-classes-per-file */
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { IsPhoneNumber } from '@/common/validators/is-phone-number.validator';

export class AddressDto {
  @IsString()
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
  public entrance!: string;

  @IsString()
  public block!: string;

  @IsString()
  public name!: string;

  @IsString()
  public comments!: string;

  @IsString()
  public lat!: Decimal;

  @IsString()
  public lng!: Decimal;
}

class TrustedUserDto {
  @IsPhoneNumber('phone')
  public phone!: string;

  @IsString()
  public iin!: string;
}

export class CreateRequestBody {
  @IsNumber()
  public requestId!: number;

  @IsPhoneNumber('phone')
  public phone!: string;

  @ValidateNested()
  @Type(() => AddressDto)
  public address!: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TrustedUserDto)
  public trustedUser?: TrustedUserDto | null;
}
