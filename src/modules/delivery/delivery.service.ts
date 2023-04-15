import { BadRequestException, Injectable } from '@nestjs/common';
import { Delivery } from '@prisma/client';

import { PrismaService } from '@/prisma';

import { DeliveryStatus } from './delivery.enum';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  public async findDelivery(deliveryId: number): Promise<Delivery> {
    const delivery = await this.prisma.delivery.findFirst({ where: { id: deliveryId }, include: { carrier: true } });

    if (!delivery) {
      throw new BadRequestException('Доставка не существует');
    }

    return delivery;
  }

  public async create(data: CreateDeliveryDto): Promise<Delivery> {
    return this.prisma.delivery.create({
      data: {
        ...data,
        status: DeliveryStatus.PENDING,
        operatorCode: this.generateVerificationCode(),
        clientCode: this.generateVerificationCode(),
      },
    });
  }

  public async assignDeliveryFor(carrierId: number, deliveryId: number): Promise<void> {
    const delivery = await this.prisma.delivery.findFirst({ where: { id: deliveryId, status: DeliveryStatus.PENDING } });

    if (!delivery) {
      throw new BadRequestException('Заказ уже не актуален');
    }

    await this.prisma.delivery.update({
      where: { id: delivery.id },
      data: { status: DeliveryStatus.ASSIGNED_CARRIER, carrierId },
    });
  }

  public async handDocsForDelivery(deliveryId: number, operatorCode: string): Promise<void> {
    const delivery = await this.prisma.delivery.findFirst({ where: { id: deliveryId, status: DeliveryStatus.ASSIGNED_CARRIER } });

    if (!delivery) {
      throw new BadRequestException('Не актуальный заказ');
    }

    if (delivery.operatorCode !== operatorCode) {
      throw new BadRequestException('Не правильный код');
    }

    await this.prisma.delivery.update({ where: { id: delivery.id }, data: { status: DeliveryStatus.ON_DELIVERY } });
  }

  public async completeDelivery(deliveryId: number, clientCode: string): Promise<void> {
    const delivery = await this.prisma.delivery.findFirst({ where: { id: deliveryId, status: DeliveryStatus.ASSIGNED_CARRIER } });

    if (!delivery) {
      throw new BadRequestException('Не актуальный заказ');
    }

    if (delivery.clientCode !== clientCode) {
      throw new BadRequestException('Не правильный код');
    }

    await this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { status: DeliveryStatus.COMPLETED, deliveredAt: new Date() },
    });
  }

  private generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
