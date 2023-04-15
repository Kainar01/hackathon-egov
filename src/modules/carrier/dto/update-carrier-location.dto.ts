import { IsNumber } from 'class-validator';

export class UpdateCarrierLocationDto {
  @IsNumber()
  lat!: number;

  @IsNumber()
  lng!: number;
}
