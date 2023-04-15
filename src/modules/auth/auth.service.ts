import { Injectable } from '@nestjs/common';
import { TelegramChat, User } from '@prisma/client';

import { TelegramChatService } from '../telegram-chat/telegram-chat.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tgChatService: TelegramChatService,
    private readonly userService: UserService,
  ) {}

  // TODO: add transaction
  public async telegramAuth(data: { tgChatId: number; type: string }): Promise<User & { telegramChat: TelegramChat }> {
    const telegramChat = await this.tgChatService.findOrCreate(data);
    const user = await this.userService.findOrCreate(telegramChat.id);

    return {
      ...user,
      telegramChat,
    };
  }
}
