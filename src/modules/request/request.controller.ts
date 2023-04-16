import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Request, UserRequest } from '@prisma/client';

import { UseAuth } from '@/common/decorators/auth.decorator';
import { ReqUser } from '@/common/decorators/req-user.decorator';

import { UserPayload } from '../auth/interface/auth.interface';
import { Role } from '../user/user.enum';
import { AcceptOrdersBody } from './dto/accept-orders.body';
import { HandDocsToClientBody } from './dto/hand-docs-to-client.body';
import { HandDocsToDeliveryBody } from './dto/hand-docs-to-delivery.body';
import { OrderDeliveryBody } from './dto/order-delivery.body';
import { RequestStatus } from './request.enum';
import { CarrierRequest, ClientRequest, OperatorRequest } from './request.interface';
import { RequestService } from './request.service';

@Controller('/request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseAuth()
  @Get('order-services')
  public async findAvailableServices(): Promise<Request[]> {
    return this.requestService.findAvailableServices();
  }

  @UseAuth()
  @Post('order-services/:requestId')
  public async createUserRequest(@ReqUser() user: UserPayload, @Param('requestId') requestId: number): Promise<UserRequest> {
    return this.requestService.createUserRequest(user.userId, requestId);
  }

  @UseAuth(Role.OPERATOR)
  @Get('order/operator')
  public async operatorOrders(@Query('status') status: RequestStatus): Promise<OperatorRequest[]> {
    return this.requestService.findForOperator(status);
  }

  @UseAuth()
  @Get('order/client')
  public async clientOrders(@ReqUser() user: UserPayload): Promise<ClientRequest[]> {
    return this.requestService.findForClient(user.userId);
  }

  @UseAuth(Role.CARRIER)
  @Get('order/carrier')
  public async carrierOrders(@ReqUser() user: UserPayload): Promise<CarrierRequest[]> {
    return this.requestService.findForCarrier(user.carrierId!);
  }

  @UseAuth()
  @Post('order-service/:requestId')
  public async orderService(@ReqUser() user: UserPayload, @Param('requestId') requestId: number): Promise<UserRequest> {
    return this.requestService.createUserRequest(user.userId, requestId);
  }

  @UseAuth()
  @Post('order-delivery')
  public async orderDeliveryForRequest(@ReqUser() user: UserPayload, @Body() data: OrderDeliveryBody): Promise<void> {
    return this.requestService.orderDeliveryForRequest(user.userId, data);
  }

  @UseAuth(Role.OPERATOR)
  @Post('approve-delivery/:userRequestId')
  public async approveDelivery(@Param('userRequestId') userRequestId: number): Promise<void> {
    return this.requestService.approveDeliveryForRequest(userRequestId, 1);
  }

  @UseAuth(Role.CARRIER)
  @Post('accept-delivery/:userRequestId')
  public async acceptDeliveryOrder(@Param('userRequestId') userRequestId: number, @ReqUser() user: UserPayload): Promise<void> {
    return this.requestService.assignCarrierForRequest(userRequestId, user.carrierId!);
  }

  @UseAuth(Role.CARRIER)
  @Post('accept-delivery/create/bulk')
  public async acceptDeliveryOrders(@Body() { userRequestIds }: AcceptOrdersBody, @ReqUser() user: UserPayload): Promise<void> {
    return this.requestService.assignCarrierForRequests(userRequestIds, user.carrierId!);
  }

  @UseAuth(Role.OPERATOR)
  @Post('hand-docs/:userRequestId/carrier')
  public async handDocsToCarrier(
    @Param('userRequestId') userRequestId: number,
      @Body() { operatorCode }: HandDocsToDeliveryBody,
  ): Promise<void> {
    return this.requestService.handDocsToRequestCarrier(userRequestId, operatorCode);
  }

  @UseAuth(Role.CARRIER)
  @Post('hand-docs/:userRequestId/client')
  public async handDocsToClient(
    @Param('userRequestId') userRequestId: number,
      @Body() { clientCode }: HandDocsToClientBody,
  ): Promise<void> {
    return this.requestService.completeRequest(userRequestId, clientCode);
  }
}
