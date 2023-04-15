import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { CarrierController } from './carrier.controller';
import { CarrierService } from './carrier.service';

@Module({
  imports: [PrismaModule],
  controllers: [CarrierController],
  providers: [CarrierService],
  exports: [CarrierService],
})
export class CarrierModule {}
