import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { CouponService } from './coupon.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
