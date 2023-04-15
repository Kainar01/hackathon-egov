import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { EgovApiModule } from '../egov-api/egov-api.module';
import { CarrierProviderController } from './carrier-provider.controller';
import { CarrierProviderService } from './carrier-provider.service';

@Module({
  imports: [PrismaModule, EgovApiModule],
  controllers: [CarrierProviderController],
  providers: [CarrierProviderService],
  exports: [CarrierProviderService],
})
export class CarrierProviderModule {}
