import { get } from 'env-var';

export class BotConfig {
  public static readonly TELEGRAM_BOT_NAME: string = get('TELEGRAM_BOT_NAME').required().asString();

  public static readonly TELEGRAM_BOT_TOKEN: string = get('TELEGRAM_BOT_TOKEN').required().asString();
}
