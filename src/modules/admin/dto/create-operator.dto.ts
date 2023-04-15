import { IsPhoneNumber } from '@/common/validators/is-phone-number.validator';
import { IsString } from 'class-validator';

export class CreateOperatorDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsPhoneNumber('KZ')
  phone!: string;
}
