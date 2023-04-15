import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserRequest } from '@prisma/client';

import { HandDocsToClientBody } from './dto/hand-docs-to-client.body';
import { HandDocsToDeliveryBody } from './dto/hand-docs-to-delivery.body';
import { OrderDeliveryBody } from './dto/order-delivery.body';
import { RequestStatus } from './request.enum';
import { CarrierRequest, ClientRequest, OperatorRequest } from './request.interface';
import { RequestService } from './request.service';

@Controller('/request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post(':requestId')
  public async createUserRequest(@Param('requestId') requestId: number): Promise<UserRequest> {
    return this.requestService.createUserRequest(1, requestId);
  }

  @Get('order/operator')
  public async operatorOrders(@Query('status') status: RequestStatus): Promise<OperatorRequest[]> {
    return this.requestService.findForOperator(status);
  }

  @Get('order/client')
  public async clientOrders(): Promise<ClientRequest[]> {
    return this.requestService.findForClient(1);
  }

  @Get('order/client')
  public async carrierOrders(): Promise<CarrierRequest[]> {
    return this.requestService.findForCarrier(1);
  }

  @Post('order-delivery')
  public async orderDeliveryForRequest(@Body() data: OrderDeliveryBody): Promise<void> {
    return this.requestService.orderDeliveryForRequest(1, data);
  }

  @Post('approve-delivery/:userRequestId')
  public async approveDelivery(@Param('userRequestId') userRequestId: number): Promise<void> {
    return this.requestService.approveDeliveryForRequest(userRequestId, 1);
  }

  @Post('hand-docs/:userRequestId/carrier')
  public async handDocsToCarrier(
    @Param('userRequestId') userRequestId: number,
      @Body() { operatorCode }: HandDocsToDeliveryBody,
  ): Promise<void> {
    return this.requestService.handDocsToRequestCarrier(userRequestId, operatorCode);
  }

  @Post('hand-docs/:userRequestId/client')
  public async handDocsToClient(
    @Param('userRequestId') userRequestId: number,
      @Body() { clientCode }: HandDocsToClientBody,
  ): Promise<void> {
    return this.requestService.completeRequest(userRequestId, clientCode);
  }
}
