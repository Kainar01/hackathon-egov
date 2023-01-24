import type { BaseEntity } from '@/common/entities/base.entity';

import type { ParcelStatusType } from '../enum/parcel.enum';

export interface Parcel extends BaseEntity {
  parcelId: number;
  userId: number;
  parcelStatus: ParcelStatusType;
  parcelGroupId: number | null;
  trackingCode: string;
  departureDepotId: number;
  destinationDepotId: number;
  weight: number | null;
  total: number | null;
  buyerFee: number | null;
  isAddedByStaff: boolean;
  comment: string | null;
}
