import { Delivery, Request, User } from '@prisma/client';

export interface OperatorRequest {
  request: Request;
  requesterUser: User;
  trustedUser: User | null;
}

export interface ClientRequest {
  request: Request;
  delivery?: Delivery | null;
}
