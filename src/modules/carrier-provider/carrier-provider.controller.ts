import { Controller, Get } from '@nestjs/common';
import { CarrierProvider } from '@prisma/client';

import { UseAuth } from '@/common/decorators/auth.decorator';

import { CarrierProviderService } from './carrier-provider.service';

@Controller('/providers')
export class CarrierProviderController {
  constructor(private readonly providerService: CarrierProviderService) {}

  @UseAuth()
  @Get('/')
  public async getProviders(): Promise<CarrierProvider[]> {
    return this.providerService.getProviders();
  }
}
