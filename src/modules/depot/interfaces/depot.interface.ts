import type { BaseEntity } from '@/common/entities/base.entity';

export interface Depot extends BaseEntity {
  depotId: number;
  name: string;
  addressId: number | null;
  lat: number;
  lng: number;
  cityId: number;
  buyerFee: number | null;
  allowOrder: boolean;
}
