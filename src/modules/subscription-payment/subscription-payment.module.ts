import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { SubscriptionPaymentService } from './subscription-payment.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [SubscriptionPaymentService],
  exports: [SubscriptionPaymentService],
})
export class SubscriptionPaymentModule {}
