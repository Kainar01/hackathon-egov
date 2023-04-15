import { BadRequestException, Injectable } from '@nestjs/common';
import { Request, UserRequest } from '@prisma/client';
import _ from 'lodash';

import { PrismaService } from '@/prisma';

import { DeliveryService } from '../delivery/delivery.service';
import { RequestStatus } from './request.enum';
import { ClientRequest, OperatorRequest } from './request.interface';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService, private readonly deliveryService: DeliveryService) {}

  public async findAvailableServices(): Promise<Request[]> {
    return this.prisma.request.findMany({
      distinct: ['serviceCode'],
    });
  }

  public async findByRequestCode(iin: string, code: string): Promise<ClientRequest> {
    const userRequest = await this.prisma.userRequest.findFirst({
      where: { request: { requestCode: code }, requesterUser: { iin } },
      include: { request: true, delivery: true },
    });

    if (!userRequest) {
      throw new BadRequestException('Не валидный запрос');
    }

    const { request, delivery } = userRequest;

    return {
      delivery,
      request,
    };
  }

  public async findForClient(userId: number): Promise<Request[]> {
    const userRequests = await this.prisma.userRequest.findMany({ where: { requesterUserId: userId }, include: { request: true } });
    return _.map(userRequests, 'request');
  }

  public async findForOperator(): Promise<OperatorRequest[]> {
    const userRequests = await this.prisma.userRequest.findMany({
      where: { status: RequestStatus.PENDING },
      include: { request: true, requesterUser: true, trustedUser: true },
    });

    return userRequests.map(({ request, trustedUser, requesterUser }: OperatorRequest) => ({ request, trustedUser, requesterUser }));
  }

  public async createUserRequest(
    userId: number,
    requestId: number,
    addressId: number,
    trustedUserId?: number | null,
  ): Promise<UserRequest> {
    return this.prisma.userRequest.create({
      data: { requesterUserId: userId, requestId, trustedUserId, status: RequestStatus.PENDING, addressId },
    });
  }

  public async assignDeliveryForRequest(userRequestId: number, operatorUserId: number): Promise<void> {
    const userRequest = await this.prisma.userRequest.findFirst({
      where: { id: userRequestId, status: RequestStatus.PENDING },
    });

    if (!userRequest) {
      throw new BadRequestException('Не валидная заявка');
    }

    await this.deliveryService.create({
      addressId: userRequest.addressId,
      userRequestId,
      acceptedByUserId: operatorUserId,
      trustedDeliveryUserId: userRequest.trustedUserId,
      carrierId: null,
    });
    await this.prisma.userRequest.update({ where: { id: userRequest.id }, data: { status: RequestStatus.IN_PROGRESS } });
  }

  public async assignCarrierForRequest(userRequestId: number, carrierId: number): Promise<void> {
    const userRequest = await this.prisma.userRequest.findFirst({
      where: { id: userRequestId },
      include: {
        delivery: true,
      },
    });

    if (!userRequest) {
      throw new BadRequestException('Не валидная заявка');
    }

    if (userRequest.status !== RequestStatus.IN_PROGRESS) {
      throw new BadRequestException('Заказ уже в доставке или не актуален');
    }

    if (!userRequest.delivery) {
      throw new BadRequestException('Заказ должен иметь доставку чтобы взять в работу');
    }

    await this.deliveryService.assignDeliveryFor(carrierId, userRequest.delivery.id);
  }

  public async handDocsToRequestCarrier(userRequestId: number, operatorCode: string): Promise<void> {
    const userRequest = await this.prisma.userRequest.findFirst({
      where: { id: userRequestId },
      include: {
        delivery: true,
      },
    });

    if (!userRequest) {
      throw new BadRequestException('Не валидная заявка');
    }

    if (userRequest.status !== RequestStatus.IN_PROGRESS) {
      throw new BadRequestException('Заказ уже в доставке или не актуален');
    }

    if (!userRequest.delivery) {
      throw new BadRequestException('Заказ должен иметь доставку чтобы передать курьеру');
    }

    await this.deliveryService.handDocsForDelivery(userRequest.delivery.id, operatorCode);
  }

  public async completeRequest(userRequestId: number, clientCode: string): Promise<void> {
    const userRequest = await this.prisma.userRequest.findFirst({
      where: { id: userRequestId },
      include: {
        delivery: true,
      },
    });

    if (!userRequest) {
      throw new BadRequestException('Не валидная заявка');
    }

    if (userRequest.status !== RequestStatus.IN_PROGRESS) {
      throw new BadRequestException('Заказ не актуален');
    }

    if (!userRequest.delivery) {
      throw new BadRequestException('Заказ должен иметь доставку чтобы передать клиенту');
    }

    await this.deliveryService.completeDelivery(userRequest.delivery.id, clientCode);
    await this.prisma.userRequest.update({ where: { id: userRequest.id }, data: { status: RequestStatus.HANDED } });
  }
}
