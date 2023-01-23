import type { BaseEntity } from '@/common/entities/base.entity';

export interface ParcelGroup extends BaseEntity {
  parcelGroupId: number;
  shippingId: number | null;
  userId: number;
  depotId: number;
  weight: number;
  comment: string | null;
}
