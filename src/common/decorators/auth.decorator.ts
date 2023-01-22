import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { isEmpty } from 'lodash';

import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import type { RoleType } from '@/modules/user/enums/role.enum';

export const UseAuth = (...roles: RoleType[]): ReturnType<typeof applyDecorators> => applyDecorators(
  SetMetadata('roles', roles),
  UseGuards(JwtAuthGuard, RolesGuard),
  ApiBearerAuth(),
  ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  // if roles are specified, it can return 403
  !isEmpty(roles) ? ApiForbiddenResponse({ description: 'Forbidden insufficient role' }) : () => {},
);
