import { Body, Controller, Param, Post } from '@nestjs/common';

import { UseAuth } from '@/common/decorators/auth.decorator';
import { ReqUser } from '@/common/decorators/req-user.decorator';
import type { UserPayload } from '@/modules/auth/auth.interface';

import { CreateParcelBodyDto } from '../dto/parcel/create-parcel.body.dto';
import { ParcelService } from '../services/parcel.service';

@Controller('depot/:depot/parcel')
export class DepotParcelController {
  constructor(private readonly parcel: ParcelService) {}

  @UseAuth()
  @Post('')
  public async createParcel(
    @Param('depot') depotId: number,
      @ReqUser() user: UserPayload,
      @Body() data: CreateParcelBodyDto,
  ): Promise<void> {
    return this.parcel.createParcel(depotId, user, data);
  }
}
