import { Delivery, Request, User, UserRequest } from '@prisma/client';

export interface OperatorRequest {
  userRequest: UserRequest & { request: Request };
  requesterUser: User;
  trustedUser?: User | null;
}

export interface ClientRequest {
  userRequest: UserRequest & { request: Request };
  delivery?: Delivery | null;
}

export interface CarrierRequest {
  userRequest: UserRequest & { request: Request };
  delivery: Delivery;
}