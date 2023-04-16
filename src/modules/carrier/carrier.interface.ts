import { Address, Carrier, Delivery, Request, User, UserRequest } from '@prisma/client';

export interface CarrierDelivery {
  delivery: Delivery & { address: Address };
  request: Request;
  userRequest: UserRequest;
  requesterUser: User;
}

export interface CarrierWithDeliveries {
  deliveries: CarrierDelivery[];
  carrier: Carrier;
}
