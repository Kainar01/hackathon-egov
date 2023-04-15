import { Role } from '@/modules/user/user.enum';

export interface LoginResponse {
  user: {
    userId: number;
    roles: Role[];
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    phone: string | null;
    iin: string | null;
  };
  token: string;
}
