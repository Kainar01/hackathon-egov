import type { BaseEntity } from '@/common/entities/base.entity';

export interface DepotStaff extends BaseEntity {
  depotStaffId: number;
  userId: number;
}
