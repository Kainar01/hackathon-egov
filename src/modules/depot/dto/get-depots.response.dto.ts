export class GetDepotsResponseDto {
  depotId!: number;

  buyerFee!: number;

  name!: string;

  lat!: number;
  
  lng!: number

  allowOrder!: boolean;

  country!: {
    countryId: number;
    name: string;
  };

  address!: {
    addressId: number;
    address: string;
    cityId: number;
    zip: string;
    phone: string;
  };
}
