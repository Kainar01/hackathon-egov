import type { BaseEntity } from '@/common/entities/base.entity';

export interface Depot extends BaseEntity {
  depotId: number;
  name: string;
  buyerFee: number | null;
  allowOrder: boolean;
  address: string;
  phone: string;
  zip: string;
  lat: number;
  lng: number;
  cityId: number;
  countryId: number;
}
