import { Role } from '@/modules/user/user.enum';

export interface UserPayload {
  userId: number;
  roles: Role[];
  carrierId?: number | undefined;
  providerOwnerId?: number | undefined;
}

export interface JwtPayload {
  sub: number;
  roles: Role[];
  carrierId?: number | undefined;
  providerOwnerId?: number | undefined;
}
