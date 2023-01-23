import type { BaseEntity } from '@/common/entities/base.entity';

export interface Buyer extends BaseEntity {
  buyerId: number;
  userId: number;
  depotId: number;
}
