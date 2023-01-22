import type { User } from '@/modules/user/interfaces/user.interface';

import type { RoleType } from '../user/enums/role.enum';

export interface JwtSign {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload extends Pick<User, 'role'> {
  sub: number;
  doctorId?: number;
  patientId?: number;
}

export interface UserPayload {
  userId: number;
  patientId?: number;
  doctorId?: number;
  role: RoleType | null;
}

export interface DoctorAuthUser {
  userId: number;
  email: string;
  password: string;
  doctorId: number;
  role: RoleType | null;
}

export interface PatientAuthUser {
  userId: number;
  email: string;
  password: string;
  patientId: number;
  role: RoleType | null;
}
