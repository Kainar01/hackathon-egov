import { Injectable } from '@nestjs/common';
import { CarrierProvider } from '@prisma/client';

import { PrismaService } from '@/prisma';

import { EgovApiService } from '../egov-api/egov-api.service';
import { Role } from '../user/user.enum';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class CarrierProviderService {
  constructor(private readonly prisma: PrismaService, private readonly egovService: EgovApiService) {}

  public async getProviders(): Promise<CarrierProvider[]> {
    return this.prisma.carrierProvider.findMany();
  }

  public async create({ phone, name }: CreateProviderDto): Promise<CarrierProvider> {
    const user = await this.prisma.user.create({
      data: {
        phone,
      },
    });

    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        role: Role.PROVIDER_OWNER,
      },
    });

    const owner = await this.prisma.providerOwner.create({ data: { userId: user.id } });

    const provider = await this.prisma.carrierProvider.create({
      data: {
        name,
        providerOwnerId: owner.id,
      },
    });

    await this.egovService.sendSMS({
      phone,
      smsText: `Ваша курьерская служба ${name} создана в egov. Войдите в личный кабинет и начните работу`,
    });

    return provider;
  }
}
