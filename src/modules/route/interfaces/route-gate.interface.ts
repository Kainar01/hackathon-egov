import type { BaseEntity } from '@/common/entities/base.entity';

export interface RouteGate extends BaseEntity {
  routeGateId: number;
  gateId: number;
  nextGateId: number;
  routeId: number;
  order: number;
  time: string | null;
  distance: string | null;
}
