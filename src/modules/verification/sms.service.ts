import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

import { MobizonConfig } from '@/config/mobizon.config';

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService, private readonly sentry: SentryService) {
  }

  public async sendMessage(data: Record<'recipient' | 'text' | 'name', string>): Promise<unknown> {
    return this.httpService.axiosRef
      .post(`${MobizonConfig.MOBIZON_API_URL}/service/Message/SendSmsMessage`, data, {
        withCredentials: true,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'cache-control': 'no-cache',
        },
        params: { output: 'json', api: 'v1', apiKey: MobizonConfig.MOBIZON_SECRET },
      })
      .catch((err: unknown) => {
        this.sentry.instance().captureException(`Error sending sms to receipient ${data.recipient}: ${err}`);
        throw err;
      });
  }
}
