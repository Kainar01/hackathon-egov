import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { CarrierProviderService } from './carrier-provider.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CarrierProviderService],
  exports: [CarrierProviderService],
})
export class CarrierProviderModule {}
