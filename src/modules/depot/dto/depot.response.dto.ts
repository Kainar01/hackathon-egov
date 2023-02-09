import { ApiProperty } from '@nestjs/swagger';

export class DepotResponseDto {
  @ApiProperty()
  depotId!: number;

  @ApiProperty()
  buyerFee!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  zip!: string;

  @ApiProperty()
  lat!: number;

  @ApiProperty()
  lng!: number;

  @ApiProperty()
  allowOrder!: boolean;
}
