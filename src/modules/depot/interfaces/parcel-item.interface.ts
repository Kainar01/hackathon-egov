import type { BaseEntity } from '@/common/entities/base.entity';

export interface ParcelItem extends BaseEntity {
  parcelItemId: number;
  parcelId: number;
  title: string;
  quantity: number;
  price: number;
}
