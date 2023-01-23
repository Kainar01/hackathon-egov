import type { BaseEntity } from '@/common/entities/base.entity';

export interface Carrier extends BaseEntity {
  carrierId: number;
  userId: number;
}
