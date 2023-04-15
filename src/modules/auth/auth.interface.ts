export interface JWTPayload {
  userId: number;
  roles: string[];
}

export interface AuthUser {
  userId: number;
  roles: string[];
}
