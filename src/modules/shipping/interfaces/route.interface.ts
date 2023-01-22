import type { BaseEntity } from '@/common/entities/base.entity';

export interface Route extends BaseEntity {
  routeId: number;
  departureDepotId: number;
  destinationDepotId: number;
  name: string;
  fee: number;
  estimatedDeliveryDays: number | null;
  description: string | null;
}
