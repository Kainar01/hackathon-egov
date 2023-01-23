import type { BaseEntity } from '@/common/entities/base.entity';

import type { DepotStaffRole } from '../enum/depot-staff.enum';

export interface DepotStaff extends BaseEntity {
  depotStaffId: number;
  userId: number;
  depotId: number;
  role: DepotStaffRole;
}
