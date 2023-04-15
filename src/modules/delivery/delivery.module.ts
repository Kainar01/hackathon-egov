import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { DeliveryService } from './delivery.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
