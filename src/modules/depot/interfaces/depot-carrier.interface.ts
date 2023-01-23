import type { BaseEntity } from '@/common/entities/base.entity';

export interface DepotCarrier extends BaseEntity {
  depotCarrierId: number;
  depotId: number;
  carrierId: number;
}
