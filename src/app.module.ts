import { BullModule } from '@nestjs/bull';
import {
  CacheStoreFactory,
  MiddlewareConsumer,
  NestModule,
  BadRequestException,
  CacheModule,
  Module,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, RouterModule } from '@nestjs/core';
import { SentryModule, SentryInterceptor } from '@ntegral/nestjs-sentry';
import * as redisStore from 'cache-manager-redis-store';
import type { ValidationError } from 'class-validator';
import { TelegrafModule } from 'nestjs-telegraf';
import type { RedisClientOptions } from 'redis';

import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { telegramSessionMiddleware } from './common/middleware/telegram-session.middleware';
import { BotConfig } from './config/bot.config';
import { RedisConfig } from './config/redis.config';
import { SentryConfig } from './config/sentry.config';
import { ServerConfig } from './config/server.config';
import { AuthModule } from './modules/auth/auth.module';
import { TelegramAuthMiddleware } from './modules/auth/middlewares/telegram-auth.middleware';
import { CoffeeShopBotModule } from './modules/coffee-shop-bot/coffee-shop-bot.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { PlanModule } from './modules/plan/plan.module';
import { SubscriptionPaymentModule } from './modules/subscription-payment/subscription-payment.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { TelegramChatModule } from './modules/telegram-chat/telegram-chat.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    SentryModule.forRoot({
      dsn: SentryConfig.SENTRY_DSN,
      debug: false,
      environment: ServerConfig.NODE_ENV,
      logLevels: ['debug'],
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: <CacheStoreFactory>redisStore,
      url: RedisConfig.REDIS_URL,
    }),
    BullModule.forRoot({
      url: RedisConfig.REDIS_URL,
    }),
    TelegrafModule.forRootAsync({
      botName: BotConfig.TELEGRAM_BOT_NAME,
      useFactory: (authMiddleware: TelegramAuthMiddleware) => ({
        token: BotConfig.TELEGRAM_BOT_TOKEN,
        middlewares: [telegramSessionMiddleware, authMiddleware.use.bind(authMiddleware)],
      }),
      inject: [TelegramAuthMiddleware],
    }),
    CommonModule,
    UserModule,
    SubscriptionModule,
    PlanModule,
    SubscriptionPaymentModule,
    CouponModule,
    CoffeeShopBotModule,
    TelegramChatModule,
    AuthModule,
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([]),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors: ValidationError[]): BadRequestException => new BadRequestException(errors),
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new SentryInterceptor({
        filters: [
          {
            type: HttpException,
            filter: (exception: HttpException) => exception.getStatus() > 500, // Only report 500 errors
          },
        ],
      }),
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
