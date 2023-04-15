import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { CarrierProviderModule } from '../carrier-provider/carrier-provider.module';
import { CarrierModule } from '../carrier/carrier.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule, CarrierModule, CarrierProviderModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
