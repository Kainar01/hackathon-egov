import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { TelegramChatModule } from '../telegram-chat/telegram-chat.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { TelegramAuthMiddleware } from './middlewares/telegram-auth.middleware';

@Module({
  imports: [PrismaModule, UserModule, TelegramChatModule],
  controllers: [],
  providers: [AuthService, TelegramAuthMiddleware],
  exports: [AuthService, TelegramAuthMiddleware],
})
export class AuthModule {}
