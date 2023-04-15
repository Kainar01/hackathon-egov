import { MiddlewareConsumer, NestModule, BadRequestException, Module, ValidationPipe, HttpException } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, RouterModule } from '@nestjs/core';
import { SentryModule, SentryInterceptor } from '@ntegral/nestjs-sentry';
import type { ValidationError } from 'class-validator';

import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SentryConfig } from './config/sentry.config';
import { ServerConfig } from './config/server.config';
import { AuthModule } from './modules/auth/auth.module';
import { CarrierProviderModule } from './modules/carrier-provider/carrier-provider.module';
import { CarrierModule } from './modules/carrier/carrier.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { RequestModule } from './modules/request/request.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    SentryModule.forRoot({
      dsn: SentryConfig.SENTRY_DSN,
      debug: false,
      environment: ServerConfig.NODE_ENV,
      logLevels: ['debug'],
    }),
    CommonModule,
    UserModule,
    AuthModule,
    CarrierModule,
    CarrierProviderModule,
    DeliveryModule,
    RequestModule,
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
