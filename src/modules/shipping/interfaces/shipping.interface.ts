import type { BaseEntity } from '@/common/entities/base.entity';

import type { ShippingType } from '../enum/shipping.enum';

export interface Shipping extends BaseEntity {
  shippingId: number;
  routeId: number;
  carrierId: number;
  fee: number;
  type: ShippingType;
  weight: number;
}
