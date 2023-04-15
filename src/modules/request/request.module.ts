import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { DeliveryModule } from '../delivery/delivery.module';
import { EgovApiModule } from '../egov-api/egov-api.module';
import { UserModule } from '../user/user.module';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  imports: [PrismaModule, UserModule, DeliveryModule, EgovApiModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
