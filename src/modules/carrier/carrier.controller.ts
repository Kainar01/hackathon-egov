import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Carrier } from '@prisma/client';

import { UseAuth } from '@/common/decorators/auth.decorator';
import { ReqUser } from '@/common/decorators/req-user.decorator';

import { UserPayload } from '../auth/interface/auth.interface';
import { Role } from '../user/user.enum';
import { CarrierDelivery } from './carrier.interface';
import { CarrierService } from './carrier.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierLocationDto } from './dto/update-carrier-location.dto';

@Controller('/carrier')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @UseAuth(Role.ADMIN, Role.PROVIDER_OWNER)
  @Post('')
  public async create(@Body() data: CreateCarrierDto): Promise<Carrier> {
    return this.carrierService.createCarrier(data);
  }

  @UseAuth(Role.CARRIER)
  @Put('')
  public async updateLocation(@ReqUser() user: UserPayload, @Body() data: UpdateCarrierLocationDto): Promise<void> {
    return this.carrierService.updateCarrierLocation(user.carrierId!, data.lat, data.lng);
  }

  @UseAuth(Role.CARRIER)
  @Get('deliveries')
  public async deliveries(@ReqUser() user: UserPayload): Promise<CarrierDelivery[]> {
    return this.carrierService.findActiveDeliveries(user.carrierId!);
  }
}
