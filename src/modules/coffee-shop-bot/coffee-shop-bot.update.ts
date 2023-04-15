import { Update, Start, Ctx } from 'nestjs-telegraf';

import { BotContext } from './coffee-shop-bot.interface';

@Update()
export class CoffeeShopBotUpdate {
  @Start()
  public onStart(@Ctx() ctx: BotContext): void {
    console.log(ctx.user);
  }
}
