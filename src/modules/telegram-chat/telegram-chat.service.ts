import { Injectable } from '@nestjs/common';
import { TelegramChat } from '@prisma/client';

import { PrismaService } from '@/prisma';

@Injectable()
export class TelegramChatService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOrCreate({ tgChatId, type }: Pick<TelegramChat, 'tgChatId' | 'type'>): Promise<TelegramChat> {
    return this.prisma.telegramChat.upsert({ where: { tgChatId }, update: {}, create: { tgChatId, type } });
  }
}
