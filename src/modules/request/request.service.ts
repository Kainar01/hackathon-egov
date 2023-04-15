import { BadRequestException, Injectable } from '@nestjs/common';
import { Request, UserRequest } from '@prisma/client';
import _ from 'lodash';

import { ServerConfig } from '@/config/server.config';
import { PrismaService } from '@/prisma';

import { DeliveryService } from '../delivery/delivery.service';
import { EgovApiService } from '../egov-api/egov-api.service';
import { UserService } from '../user/user.service';
import { OrderDeliveryBody } from './dto/order-delivery.body';
import { RequestStatus } from './request.enum';
import { CarrierRequest, ClientRequest, OperatorRequest } from './request.interface';

@Injectable()
export class RequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly deliveryService: DeliveryService,
    private readonly egovApiService: EgovApiService,
    private readonly userService: UserService,
  ) {}

  public async findAvailableServices(): Promise<Request[]> {
    return this.prisma.request.findMany({
      distinct: ['serviceCode'],
    });
  }

  public async findForCarrier(carrierId: number): Promise<CarrierRequest[]> {
    const carrier = await this.prisma.carrier.findFirst({ where: { id: carrierId } });

    if (!carrier) {
      throw new BadRequestException('Невалидный курьер');
    }

    const deliveries = await this.prisma.delivery.findMany({
      where: { userRequest: { status: RequestStatus.IN_PROGRESS }, carrierProviderId: carrier.providerId },
      include: { userRequest: { include: { request: true, requesterUser: true } } },
    });

    // eslint-disable-next-line @typescript-eslint/typedef
    return deliveries.map(({ userRequest: { request, requesterUser, ...userRequest }, ...delivery }) => ({
      delivery,
      request,
      requesterUser,
      userRequest,
    }));
  }

  public async findByRequestCode(iin: string, code: string): Promise<ClientRequest> {
    const userRequest = await this.prisma.userRequest.findFirst({
      where: { request: { requestCode: code }, requesterUser: { iin } },
      include: { request: true, delivery: true },
    });

    if (!userRequest) {
      throw new BadRequestException('Не валидный запрос');
    }

    return {
      delivery: userRequest.delivery,
      userRequest: _.omit(userRequest, 'delivery'),
    };
  }

  public async findForClient(userId: number): Promise<ClientRequest[]> {
    const userRequests = await this.prisma.userRequest.findMany({
      where: { requesterUserId: userId },
      include: { request: true, delivery: true },
    });

    // eslint-disable-next-line @typescript-eslint/typedef
    return userRequests.map(({ delivery, ...userRequest }) => ({ delivery, userRequest }));
  }

  public async findForOperator(status: RequestStatus = RequestStatus.PENDING): Promise<OperatorRequest[]> {
    const userRequests = await this.prisma.userRequest.findMany({
      where: { status },
      include: { request: true, requesterUser: true, delivery: { include: { trustedDeliveryUser: true } } },
    });

    // eslint-disable-next-line @typescript-eslint/typedef
    return userRequests.map(({ requesterUser, delivery, ...userRequest }) => ({
      userRequest,
      trustedUser: delivery?.trustedDeliveryUser,
      requesterUser,
    }));
  }

  public async orderDeliveryForRequest(
    userId: number,
    { carrierProviderId, userRequestId, phone, address, trustedUser }: OrderDeliveryBody,
  ): Promise<void> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('Пользователь не существует');
    }

    const userRequest = await this.prisma.userRequest.findFirst({ where: { id: userRequestId } });

    if (!userRequest) {
      throw new BadRequestException('Сервис не существует');
    }

    let trustedUserId = null;

    if (trustedUser) {
      const createdTrustedUser = await this.userService.createByIIN(trustedUser?.iin);

      trustedUserId = createdTrustedUser.id;
    }

    let addressId = address?.id;

    if (!addressId) {
      const newAddress = await this.prisma.address.create({
        data: {
          ...address,
          userId: user.id,
        },
      });
      addressId = newAddress.id;
    }

    const deliveryPhone = trustedUser?.phone || phone;

    await this.deliveryService.create({
      addressId,
      userRequestId,
      trustedDeliveryUserId: trustedUserId,
      acceptedByUserId: null,
      carrierId: null,
      phone: deliveryPhone,
      carrierProviderId,
    });
  }

  public async createUserRequest(userId: number, requestId: number): Promise<UserRequest> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('Пользователь не существует');
    }

    const request = await this.prisma.request.findFirst({ where: { id: requestId } });

    if (!request) {
      throw new BadRequestException('Сервис не существует');
    }

    const userRequest = await this.prisma.userRequest.create({
      data: { requesterUserId: userId, requestId, status: RequestStatus.PENDING },
    });

    const url = `${ServerConfig.SERVER_HOST}/client/request/${request.requestCode}`;

    if (user.phone) {
      await this.egovApiService.sendSMS({
        phone: user.phone,
        // eslint-disable-next-line @typescript-eslint/quotes
        smsText: `Сіздің #${request.requestCode} құжатыңыз дайын. ${url} сілтемесін басу арқылы құжатты жеткізуді пайдалана аласыз. Құжатты жеткізу курьерлік қызметтің жеткізу мерзімдеріне сәйкес жүзеге асырылады. Ваш документ #${request.requestCode} готов. Можете воспользоваться доставкой документа следуя по ссылке ${url}. Доставка осуществляется в соответствии со сроками доставки курьерской службы`,
      });
    }

    return userRequest;
  }

  public async approveDeliveryForRequest(userRequestId: number, operatorId: number): Promise<void> {
    const userRequest = await this.prisma.userRequest.findFirst({
      where: { id: userRequestId, status: RequestStatus.PENDING },
      include: { delivery: { include: { carrier: { include: { user: true } } } } },
    });

    if (!userRequest || !userRequest.delivery) {
      throw new BadRequestException('Не валидная заявка');
    }

    await this.prisma.userRequest.update({ where: { id: userRequest.id }, data: { status: RequestStatus.IN_PROGRESS } });
    await this.prisma.delivery.update({ where: { id: userRequest.delivery.id }, data: { acceptedByUserId: operatorId } });

    await this.egovApiService.sendSMS({
      phone: userRequest.delivery.phone,
      smsText: `Вы заказали доставку документов по заказу #${userRequest.requestId}. Покажите смс код курьеру чтобы вам выдали документы. Код: ${userRequest.delivery.clientCode}`,
    });
  }

  public async assignCarrierForRequest(userRequestId: number, carrierId: number): Promise<void> {
    const userRequest = await this.prisma.userRequest.findFirst({
      where: { id: userRequestId },
      include: {
        delivery: true,
      },
    });

    const carrier = await this.prisma.carrier.findFirst({ where: { id: carrierId }, include: { user: true } });

    if (!carrier) {
      throw new BadRequestException('Не валидный курьер');
    }

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

    await this.egovApiService.sendSMS({
      phone: carrier.user.phone!,
      smsText: `Вы приняли заказ #${userRequest.requestId}. Покажите смс код оператору чтобы вам выдали документы. Код: ${userRequest.delivery.operatorCode}`,
    });
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
