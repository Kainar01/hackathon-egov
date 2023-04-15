import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { CarrierModule } from '../carrier/carrier.module';
import { EgovApiModule } from '../egov-api/egov-api.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule, CarrierModule, EgovApiModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
