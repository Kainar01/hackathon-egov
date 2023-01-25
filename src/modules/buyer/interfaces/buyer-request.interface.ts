import type { BaseEntity } from '@/common/entities/base.entity';

import type { BuyerRequestStatus } from '../enums/buyer-request.enum';

export interface BuyerRequest extends BaseEntity {
  buyerRequestId: number;
  userId: number;
  depotId: number;
  buyerStaffId: number | null;
  total: number;
  status: BuyerRequestStatus;
  comment: string | null;
}
