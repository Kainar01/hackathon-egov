import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { CarrierService } from './carrier.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CarrierService],
  exports: [CarrierService],
})
export class CarrierModule {}
