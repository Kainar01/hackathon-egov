import { Role } from '@/modules/user/user.enum';

export interface UserPayload {
  userId: number;
  roles: Role[];
}

export interface JwtPayload {
  sub: number;
  roles: Role[];
}
