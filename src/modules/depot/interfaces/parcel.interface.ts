import type { BaseEntity } from '@/common/entities/base.entity';

export interface Parcel extends BaseEntity {
  parcelId: number;
  userId: number;
  parcelStatusId: number | null;
  parcelGroupId: number | null;
  trackingCode: string;
  departureDepotId: number;
  destinationDepotId: number;
  weight: number;
  total: number;
  buyerFee: number;
  comment: string | null;
}
