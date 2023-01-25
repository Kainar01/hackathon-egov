import type { BaseEntity } from '@/common/entities/base.entity';

import type { DepotStaffRoleType } from '../enum/depot-staff.enum';

export interface DepotStaffRole extends BaseEntity {
  depotStaffRoleId: number;
  depotStaffId: number;
  depotId: number;
  role: DepotStaffRoleType;
  deactivatedAt: Date | null;
}
