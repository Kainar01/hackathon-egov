import type { BaseEntity } from '@/common/entities/base.entity';

export interface ShippingRouteGate extends BaseEntity {
  shippingRouteGateId: number;
  shippingId: number;
  routeGateId: number;
  arrival: Date | null;
  departure: Date | null;
  skipped: boolean;
  comment: string | null;
}
