import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { AuthModule } from '../auth/auth.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { CoffeeShopBotUpdate } from './coffee-shop-bot.update';

@Module({
  imports: [
    PrismaModule,
    SubscriptionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [CoffeeShopBotUpdate],
  exports: [],
})
export class CoffeeShopBotModule {}
