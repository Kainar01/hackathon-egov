import { get } from 'env-var';

export class MobizonConfig {
  public static readonly MOBIZON_API_URL: string = get('MOBIZON_API_URL').required().asString();

  public static readonly MOBIZON_SECRET: string = get('MOBIZON_SECRET').required().asString();

  public static readonly MOBIZON_DISABLED: boolean = get('MOBIZON_DISABLED').default('false').required().asBool();
}
