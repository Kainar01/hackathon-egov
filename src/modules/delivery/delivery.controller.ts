import { Controller, Get, Param } from '@nestjs/common';
import { Address, Carrier, Delivery, Request } from '@prisma/client';

import { UseAuth } from '@/common/decorators/auth.decorator';

import { DeliveryService } from './delivery.service';

@Controller('/delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @UseAuth()
  @Get('/:deliveryId')
  public async findDelivery(
    @Param('deliveryId') deliveryId: number,
  ): Promise<{ delivery: Delivery & { address: Address }; carrier: Carrier | null; request: Request }> {
    return this.deliveryService.findDelivery(deliveryId);
  }

  @UseAuth()
  @Get('/:deliveryId/carrier')
  public async findCarrier(@Param('deliveryId') deliveryId: number): Promise<Carrier> {
    return this.deliveryService.findCarrier(deliveryId);
  }
}
