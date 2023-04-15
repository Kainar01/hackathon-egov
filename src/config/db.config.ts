import { get } from 'env-var';

export class DbConfig {
  public static readonly DATABASE_URL: string = get('DATABASE_URL').required().asString();
}
