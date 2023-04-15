import { Injectable } from '@nestjs/common';

import { AuthService } from '@/modules/auth/auth.service';

import { Logger } from '../../../common/logger';
import { BotContext } from '../../coffee-shop-bot/coffee-shop-bot.interface';

export const telegramAuthMiddleware = (authService: AuthService) => async (ctx: BotContext, next: () => Promise<void>): Promise<void> => {
  try {
    if (ctx.chat) {
      const user = await authService.telegramAuth({ tgChatId: ctx.chat.id, type: ctx.chat.type });

      ctx.user = user;
    }
  } catch (err) {
    console.error(err);
  } finally {
    await next();
  }
};

@Injectable()
export class TelegramAuthMiddleware {
  constructor(private readonly logger: Logger, private readonly authService: AuthService) {}

  public async use(ctx: BotContext, next: () => Promise<void>): Promise<void> {
    try {
      if (ctx.chat) {
        const user = await this.authService.telegramAuth({ tgChatId: ctx.chat.id, type: ctx.chat.type });

        ctx.user = user;
      }
    } catch (err) {
      this.logger.error(err);
    } finally {
      await next();
    }
  }
}
