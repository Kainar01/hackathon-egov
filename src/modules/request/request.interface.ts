import { Carrier, Delivery, Request, User, UserRequest } from '@prisma/client';

export interface OperatorRequest {
  userRequest: UserRequest & { request: Request };
  requesterUser: User;
  trustedUser?: User | null;
  delivery: Delivery;
  carrier: Carrier;
}

export interface ClientRequest {
  userRequest: UserRequest & { request: Request };
  delivery?: Delivery | null;
}

export interface CarrierRequest {
  userRequest: UserRequest;
  delivery: Delivery;
  request: Request;
  requesterUser: User;
}
