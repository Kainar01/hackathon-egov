import type { User } from '@/modules/user/interfaces/user.interface';

import type { RoleType } from '../user/enums/role.enum';

export interface JwtSign {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload extends Pick<User, 'role'> {
  sub: number;
  depotStaffId: number | null;
}

export interface UserPayload {
  userId: number;
  depotStaffId: number | null;
  role: RoleType | null;
}
