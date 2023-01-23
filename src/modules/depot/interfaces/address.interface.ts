import type { BaseEntity } from '@/common/entities/base.entity';

export interface DepotAddress extends BaseEntity {
  depotAddressId: number;
  address: string;
  cityId: number;
  zip: string;
  phone: string;
}
