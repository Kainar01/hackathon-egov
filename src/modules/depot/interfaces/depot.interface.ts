import type { BaseEntity } from '@/common/entities/base.entity';

export interface Depot extends BaseEntity {
  depotId: number;
  name: string;
  addressId: number;
  lat: number;
  lng: number;
  countryId: number;
  buyerFee: number | null;
  allowOrder: boolean;
}
