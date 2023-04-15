import { Delivery, Request, User } from '@prisma/client';

export interface CarrierDelivery {
  delivery: Delivery;
  request: Request;
  requesterUser: User;
}
