import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { DeliveryModule } from '../delivery/delivery.module';
import { RequestService } from './request.service';

@Module({
  imports: [PrismaModule, DeliveryModule],
  controllers: [],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
