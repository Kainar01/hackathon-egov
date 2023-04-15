import { BadRequestException, Injectable } from '@nestjs/common';
import { Subscription } from '@prisma/client';
import moment from 'moment';

import { PrismaService } from '@/prisma';

import { CouponService } from '../coupon/coupon.service';
import { SubscriptionPaymentService } from '../subscription-payment/subscription-payment.service';
import { SubscriptionStatus } from './subscription.enum';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly coupon: CouponService,
    private readonly subscriptionPayment: SubscriptionPaymentService,
  ) {}

  public async findOne(subscriptionId: number): Promise<Subscription | null> {
    return this.prisma.subscription.findFirst({ where: { id: subscriptionId } });
  }

  public async buyWithCoupon(couponCode: string, userId: number): Promise<Subscription> {
    const { coupon, plan } = await this.coupon.activate(couponCode);

    const startDate = new Date();
    const expirationDate = this.calculateExpirationDate(startDate, plan.periodDays);

    const subscription = await this.prisma.subscription.create({
      data: {
        planId: plan.id,
        userId,
        startDate,
        expirationDate,
        coffeeLimit: plan.coffeeLimit,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    await this.subscriptionPayment.pay(subscription, plan, coupon);

    return subscription;
  }

  public async renewWithCoupon(subscriptionId: number, couponCode: string): Promise<void> {
    const subscription = await this.prisma.subscription.findFirst({ where: { id: subscriptionId }, include: { plan: true } });

    if (!subscription) {
      throw new BadRequestException('Подписка не существует');
    }

    const { coupon } = await this.coupon.activate(couponCode, subscription.plan.id);

    const startDate = new Date();
    const expirationDate = this.calculateExpirationDate(startDate, subscription.plan.periodDays);

    await this.prisma.subscription.update({
      where: {
        id: subscription.id,
      },
      data: {
        startDate,
        expirationDate,
        coffeeOrders: 0,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    await this.subscriptionPayment.pay(subscription, subscription.plan, coupon);
  }

  private calculateExpirationDate(startDate: Date, periodDays: number): Date {
    const startMomentDate = moment(startDate);

    const endDate = startMomentDate.add(periodDays, 'days');

    return endDate.toDate();
  }
}
