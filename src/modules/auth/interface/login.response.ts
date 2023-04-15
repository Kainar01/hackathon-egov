import { Role } from '@/modules/user/user.enum';

export interface LoginResponse {
  userId: number;
  roles: Role[];
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  iin: string | null;
}
