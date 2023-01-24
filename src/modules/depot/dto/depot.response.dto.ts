import { ApiProperty } from '@nestjs/swagger';

export class DepotResponseDto {
  @ApiProperty()
  depotId!: number;

  @ApiProperty()
  buyerFee!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  lat!: number;

  @ApiProperty()
  lng!: number;

  @ApiProperty()
  allowOrder!: boolean;

  @ApiProperty({ type: 'object' })
  country!: {
    countryId: number;
    name: string;
  };

  @ApiProperty({ type: 'object' })
  address!: {
    addressId: number;
    address: string;
    cityId: number;
    cityName: string;
    zip: string;
    phone: string;
  };
}
