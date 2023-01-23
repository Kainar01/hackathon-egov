import type { BaseEntity } from '@/common/entities/base.entity';

export interface BuyerRequestItem extends BaseEntity {
  buyerRequestItemId: number;
  buyerRequestId: number;
  title: string;
  link: string;
  size: string | null;
  color: string | null;
  price: number;
  quantity: number;
}
