import LocalSession from 'telegraf-session-local';

// todo: replace with redis session
export const telegramSessionMiddleware = new LocalSession({});
