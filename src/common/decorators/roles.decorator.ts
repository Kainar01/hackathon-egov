import { SetMetadata } from '@nestjs/common';

import type { RoleType } from '@/modules/user/enums/role.enum';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const HasRoles = (...roles: RoleType[]) => SetMetadata('roles', roles);
