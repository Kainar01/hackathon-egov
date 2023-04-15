import { Body, Controller, Get, Post } from '@nestjs/common';
import { Carrier, CarrierProvider, User } from '@prisma/client';

import { CarrierProviderService } from '../carrier-provider/carrier-provider.service';
import { CarrierService } from '../carrier/carrier.service';
import { AdminService } from './admin.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { CreateProviderDto } from './dto/create-provider.dto';

@Controller('/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly carrierService: CarrierService,
    private readonly carrierProviderService: CarrierProviderService,
  ) {}

  @Post('/operators')
  public async createOperator(@Body() data: CreateOperatorDto): Promise<User> {
    return this.adminService.createOperator(data);
  }

  @Post('/carrier')
  public async createCarrier(@Body() data: CreateCarrierDto): Promise<Carrier> {
    return this.carrierService.createCarrier(data);
  }

  @Post('/carrier-provider')
  public async createCarrierProvider(@Body() data: CreateProviderDto): Promise<CarrierProvider> {
    return this.carrierProviderService.create(data);
  }

  @Get('/operators')
  public async findOperators(): Promise<User[]> {
    return this.adminService.findOperators();
  }
}
