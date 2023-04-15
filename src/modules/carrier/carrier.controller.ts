import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Carrier } from '@prisma/client';

import { CarrierDelivery } from './carrier.interface';
import { CarrierService } from './carrier.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierLocationDto } from './dto/update-carrier-location.dto';

@Controller('/carrier')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Post('')
  public async create(@Body() data: CreateCarrierDto): Promise<Carrier> {
    return this.carrierService.createCarrier(data);
  }

  @Put('')
  public async updateLocation(@Body() data: UpdateCarrierLocationDto): Promise<void> {
    // TODO: CARRIER ID
    return this.carrierService.updateCarrierLocation(2, data.lat, data.lng);
  }

  @Get('deliveries')
  public async deliveries(): Promise<CarrierDelivery[]> {
    // TODO: CARRIER ID
    return this.carrierService.findActiveDeliveries(2);
  }
}
