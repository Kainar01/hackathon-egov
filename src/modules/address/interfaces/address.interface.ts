import type { BaseEntity } from '@/common/entities/base.entity';

export interface Address extends BaseEntity {
  addressId: number;
  address: string;
  cityId: number;
  zip: string | null;
  phone: string | null;
  lat: number | null;
  lng: number | null;
}
