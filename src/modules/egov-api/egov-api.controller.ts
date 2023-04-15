import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { SmsDataDto } from './dto/sms-data.dto';
import { EgovApiService } from './egov-api.service';
import type { AccessToken } from './interfaces/access-token.interface';
import type { Phone } from './interfaces/phone-number.interface';
import type { SmsStatus } from './interfaces/sms-status.interface';
import type { UserInfo } from './interfaces/user-info.interface';

@Controller('egov-api')
export class EgovApiController {
  constructor(private readonly egovApi:EgovApiService) {}

  @Get('/token')
  public async getToken():Promise<AccessToken> {
    return this.egovApi.getToken();
  }

  @Get('/fl/:iin')
  public async getFL(@Param('iin') iin:string):Promise<UserInfo> {
    return this.egovApi.getEgovUser(iin);
  }

  @Get('/phone/:iin')
  public async getPhone(@Param('iin') iin:string): Promise<Phone> {
    return this.egovApi.getPhone(iin);
  }

  @Post('/sms/send')
  public async sendSMS(@Body() smsData:SmsDataDto):Promise<SmsStatus> {
    return this.egovApi.sendSMS(smsData);
  }
}
