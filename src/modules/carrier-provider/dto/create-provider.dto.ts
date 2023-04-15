import { CarrierProvider } from '@prisma/client';

export interface CreateProviderDto extends Pick<CarrierProvider, 'name'> {
  providerOwner: {
    phone: string;
  };
}
