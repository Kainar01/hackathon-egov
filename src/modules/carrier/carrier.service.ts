import { Injectable } from '@nestjs/common';
import { Carrier } from '@prisma/client';

import { PrismaService } from '@/prisma';

import { Role } from '../user/user.enum';
import { CreateCarrierDto } from './dto/create-carrier.dto';

@Injectable()
export class CarrierService {
  constructor(private readonly prisma: PrismaService) {}

  public async updateCarrierLocation(carrierId: number, lat: number, lng: number): Promise<void> {
    await this.prisma.carrier.update({ where: { id: carrierId }, data: { lat, lng } });
  }

  public async createCarrier({ phone, providerId, firstName, lastName }: CreateCarrierDto): Promise<Carrier> {
    const user = await this.prisma.user.create({
      data: {
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
