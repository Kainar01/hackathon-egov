import { Injectable } from '@nestjs/common';
import { Carrier } from '@prisma/client';

import { PrismaService } from '@/prisma';

import { DeliveryStatus } from '../delivery/delivery.enum';
import { Role } from '../user/user.enum';
import { CarrierDelivery } from './carrier.interface';
import { CreateCarrierDto } from './dto/create-carrier.dto';

@Injectable()
export class CarrierService {
  constructor(private readonly prisma: PrismaService) {}

  public async updateCarrierLocation(carrierId: number, lat: number, lng: number): Promise<void> {
    await this.prisma.carrier.update({ where: { id: carrierId }, data: { lat, lng } });
  }

  public async findActiveDeliveries(carrierId: number): Promise<CarrierDelivery[]> {
    const deliveries = await this.prisma.delivery.findMany({
      where: { AND: [{ carrierId }, { OR: [{ status: DeliveryStatus.ASSIGNED_CARRIER }, { status: DeliveryStatus.ON_DELIVERY }] }] },
      include: { userRequest: { include: { request: true, requesterUser: true } } },
    });
    // eslint-disable-next-line @typescript-eslint/typedef
    return deliveries.map(({ userRequest, ...delivery }) => ({
      request: userRequest.request,
      requesterUser: userRequest.requesterUser,
      delivery,
    }));
  }

  public async createCarrier({ phone, providerId, firstName, lastName }: CreateCarrierDto): Promise<Carrier> {
    const user = await this.prisma.user.upsert({
      where: { phone },
      update: {
        phone,
        firstName,
        lastName,
      },
      create: {
        phone,
        firstName,
        lastName,
      },
    });

    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        role: Role.CARRIER,
      },
    });

    return this.prisma.carrier.create({ data: { userId: user.id, providerId, lat: 0, lng: 0 } });
  }
}
