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

  public async findOne(carrierId: number): Promise<Carrier> {
    return this.prisma.carrier.findFirstOrThrow({ where: { id: carrierId } });
  }

  public async updateCarrierLocation(carrierId: number, lat: number, lng: number): Promise<void> {
    await this.prisma.carrier.update({ where: { id: carrierId }, data: { lat, lng } });
  }

  public async findActiveDeliveries(carrierId: number): Promise<CarrierDelivery[]> {
    const deliveries = await this.prisma.delivery.findMany({
      where: { AND: [{ carrierId }, { OR: [{ status: DeliveryStatus.ASSIGNED_CARRIER }, { status: DeliveryStatus.ON_DELIVERY }] }] },
      include: { userRequest: { include: { request: true, requesterUser: true } }, address: true },
    });
    // eslint-disable-next-line @typescript-eslint/typedef
    return deliveries.map(({ userRequest: { request, requesterUser, ...userRequest }, ...delivery }) => ({
      request,
      requesterUser,
      userRequest,
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

    await this.prisma.userRole.upsert({
      where: { userId_role: { role: Role.CARRIER, userId: user.id } },
      update: {},
      create: {
        userId: user.id,
        role: Role.CARRIER,
      },
    });

    return this.prisma.carrier.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id, providerId, lat: 0, lng: 0 } });
  }
}
