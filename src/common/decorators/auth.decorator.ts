import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import { Role } from '@/modules/user/user.enum';

export const UseAuth = (...roles: Role[]): ReturnType<typeof applyDecorators> => applyDecorators(
  SetMetadata('roles', roles),
  UseGuards(JwtAuthGuard, RolesGuard),
);
