import { IsString } from 'class-validator';

export class CreateOperatorDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  phone!: string;
}
