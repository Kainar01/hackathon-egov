import type { BaseEntity } from '@/common/entities/base.entity';

export interface UserAddress extends BaseEntity {
  userId: number;
  cityId: number;
  address: string;
  entrance: string | null;
  apartment: string | null;
  floor: string | null;
  doorPhone: string | null;
  geoLat: number | null;
  geoLng: number | null;
}
