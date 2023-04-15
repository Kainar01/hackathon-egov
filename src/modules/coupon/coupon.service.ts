import { BadRequestException, Injectable } from '@nestjs/common';
import { Coupon, Plan } from '@prisma/client';
import moment from 'moment';

import { PrismaService } from '@/prisma';

@Injectable()
export class CouponService {
  constructor(private readonly prisma: PrismaService) {}

  public async activate(couponCode: string, planId?: number): Promise<{ plan: Plan; coupon: Coupon }> {
    const coupon = await this.prisma.coupon.findFirst({ where: { code: couponCode }, include: { plan: true } });

    if (!coupon) {
      throw new BadRequestException('Неправильный код купона');
    }

    if (planId && coupon.plan.id !== planId) {
      throw new BadRequestException(`Купон не действителен для плана ${coupon.plan.name}`);
    }

    if (coupon.activatedAt) {
      throw new BadRequestException('Купон уже использован');
    }

    if (moment().isAfter(moment(coupon.expirationDate))) {
      throw new BadRequestException('Срок действия купона истек');
    }

    const activatedCoupon = await this.prisma.coupon.update({ where: { id: coupon.id }, data: { activatedAt: new Date() } });

    return {
      coupon: activatedCoupon,
      plan: coupon.plan,
    };
  }
}
