import { Delivery } from '@prisma/client';

export interface CreateDeliveryDto
  extends Pick<Delivery, 'addressId' | 'userRequestId' | 'acceptedByUserId' | 'carrierId' | 'trustedDeliveryUserId'> {}
