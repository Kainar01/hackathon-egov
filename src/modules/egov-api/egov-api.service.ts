import { Injectable } from '@nestjs/common';
import axios from 'axios';

import type { SmsDataDto } from './dto/sms-data.dto';
import type { AccessToken } from './interfaces/access-token.interface';
import type { Phone } from './interfaces/phone-number.interface';
import type { SmsStatus } from './interfaces/sms-status.interface';
import type { UserInfo } from './interfaces/user-info.interface';

@Injectable()
export class EgovApiService {
  public async getToken():Promise<AccessToken> {
    const data = new URLSearchParams({
      username: 'test-operator',
      password: 'DjrsmA9RMXRl',
      client_id: 'cw-queue-service',
      grant_type: 'password',
    });

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const response = await axios.post(
      'http://hakaton-idp.gov4c.kz/auth/realms/con-web/protocol/openid-connect/token',
      data,
      config,
    );
    return <AccessToken> { access_token: response.data.access_token };
  }

  public async getEgovUser(iin:string):Promise<UserInfo> {
    const url = `http://hakaton-fl.gov4c.kz/api/persons/${iin}/`;
    const token = await this.getToken().then((result:AccessToken) => result.access_token);

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    return <UserInfo>response.data;
  }

  public async getPhone(iin:string):Promise<Phone> {
    const url = `http://hakaton.gov4c.kz/api/bmg/check/${iin}/`;
    const token = await this.getToken().then((result:AccessToken) => result.access_token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    return <Phone>response.data;
  }

  public async sendSMS({ phone, smsText }:SmsDataDto):Promise<SmsStatus> {
    const url = 'http://hak-sms123.gov4c.kz/api/smsgateway/send';
    const token = await this.getToken().then((result:AccessToken) => result.access_token);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const payload = {
      phone,
      smsText,
    };

    const response = await axios.post(url, payload, { headers });
    return <SmsStatus> response.data;
  }
}
