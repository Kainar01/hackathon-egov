import type { BaseEntity } from '@/common/entities/base.entity';

export interface Gate extends BaseEntity {
  gateId: number;
  countryId: number;
  lat: number | null;
  lng: number | null;
  name: string;
  description: string | null;
  depotId: number | null;
}
