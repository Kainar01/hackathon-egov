import { Injectable } from '@nestjs/common';
import { CarrierProvider } from '@prisma/client';

import { PrismaService } from '@/prisma';

import { Role } from '../user/user.enum';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class CarrierProviderService {
  constructor(private readonly prisma: PrismaService) {}

  public async create({ providerOwner, ...data }: CreateProviderDto): Promise<CarrierProvider> {
    const user = await this.prisma.user.create({
      data: {
        ...providerOwner,
      },
    });

    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        role: Role.PROVIDER_OWNER,
      },
    });

    const provider = await this.prisma.providerOwner.create({ data: { userId: user.id } });

    return this.prisma.carrierProvider.create({
      data: {
        ...data,
        providerOwnerId: provider.id,
      },
    });
  }
}
