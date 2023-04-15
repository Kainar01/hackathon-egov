import { Body, Controller, Post } from '@nestjs/common';
import { CarrierProvider } from '@prisma/client';

import { UseAuth } from '@/common/decorators/auth.decorator';

import { Role } from '../user/user.enum';
import { CarrierProviderService } from './carrier-provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Controller('/provider')
export class CarrierProviderController {
  constructor(private readonly providerService: CarrierProviderService) {}

  @UseAuth(Role.ADMIN)
  @Post('/')
  public async createProvider(@Body() data: CreateProviderDto): Promise<CarrierProvider> {
    return this.providerService.create(data);
  }
}
