import type { DepotStaffRole } from '../enum/depot-staff.enum';

export interface DepotStaff {
  depotStaffId: number;
  userId: number;
  depotId: number;
  role: DepotStaffRole;
}
