import type { BaseEntity } from '@/common/entities/base.entity';

import type { ShippingEventType } from '../enum/shipping-event.enum';

export interface ShippingEvent extends BaseEntity {
  shippingEventId: number;
  shippingId: number;
  gateId: number | null;
  arrival: Date | null;
  departure: Date | null;
  skipped: boolean;
  comment: string | null;
  type: ShippingEventType;
}
