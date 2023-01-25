import { SetMetadata } from '@nestjs/common';

import type { DepotStaffRoleType } from '@/modules/depot/enum/depot-staff.enum';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const HasDepotStaffRoles = (...roles: DepotStaffRoleType[]) => SetMetadata('roles', roles);
