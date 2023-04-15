import { User } from '@prisma/client';
import type { Context, Scenes } from 'telegraf';

export interface BotContext extends Context, Scenes.SceneContext {
  user?: User;
}
