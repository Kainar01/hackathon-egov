import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { CouponModule } from '../coupon/coupon.module';
import { PlanModule } from '../plan/plan.module';
import { SubscriptionPaymentModule } from '../subscription-payment/subscription-payment.module';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [PrismaModule, SubscriptionPaymentModule, PlanModule, CouponModule],
  controllers: [],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
