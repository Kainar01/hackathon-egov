import type { BaseEntity } from '@/common/entities/base.entity';

import type { ParcelStatusType } from '../enum/parcel.enum';

export interface ParcelStatus extends BaseEntity {
  parcelStatusId: number;
  parcelId: number;
  type: ParcelStatusType;
  comment: string | null;
}
