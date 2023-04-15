import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { TelegramChatService } from './telegram-chat.service';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [],
  providers: [TelegramChatService],
  exports: [TelegramChatService],
})
export class TelegramChatModule {
}
