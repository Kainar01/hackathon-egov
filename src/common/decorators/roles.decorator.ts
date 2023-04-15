import { SetMetadata } from '@nestjs/common';

import type { Role } from '@/modules/user/user.enum';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
