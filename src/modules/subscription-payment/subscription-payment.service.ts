import { Injectable } from '@nestjs/common';
import { Coupon, Plan, Subscription, SubscriptionPayment } from '@prisma/client';

import { PrismaService } from '@/prisma';

import { SubscriptionPaymentType, SubscriptionPaymentStatus } from './subscription-payment.enum';

@Injectable()
export class SubscriptionPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: ADD TRANSACTION
  public async pay(
    subscription: Subscription,
    plan: Plan,
    coupon: Coupon,
  ): Promise<SubscriptionPayment> {
    return this.prisma.subscriptionPayment.create({
      data: {
        userId: subscription.userId,
        amount: plan.price,
        subscriptionId: subscription.id,
        couponId: coupon.id,
        status: SubscriptionPaymentStatus.PAID,
        type: SubscriptionPaymentType.CASH,
      },
    });
  }
}
