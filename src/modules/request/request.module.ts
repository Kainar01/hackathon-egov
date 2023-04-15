import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { DeliveryModule } from '../delivery/delivery.module';
import { EgovApiModule } from '../egov-api/egov-api.module';
import { RequestService } from './request.service';

@Module({
  imports: [PrismaModule, DeliveryModule, EgovApiModule],
  controllers: [],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
