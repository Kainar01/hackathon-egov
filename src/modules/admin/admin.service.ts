import { Injectable } from '@nestjs/common';
import { CarrierProvider, User } from '@prisma/client';
import _ from 'lodash';

import { PrismaService } from '@/prisma';

import { EgovApiService } from '../egov-api/egov-api.service';
import { Role } from '../user/user.enum';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService, private readonly egovService: EgovApiService) {}

  public async createOperator(data: CreateOperatorDto): Promise<User> {
    const user = await this.prisma.user.upsert({ where: { phone: data.phone }, update: {}, create: data });
    await this.prisma.userRole.upsert({
      where: { userId_role: { userId: user.id, role: Role.OPERATOR } },
      update: {},
      create: { userId: user.id, role: Role.OPERATOR },
    });

    await this.egovService.sendSMS({
      phone: data.phone,
      smsText: 'Вас назначили оператором в egov. Зайдите в личный кабинет используя этот номер',
    });

    return user;
  }

  public async findOperators(): Promise<User[]> {
    const roles = await this.prisma.userRole.findMany({ where: { role: Role.OPERATOR }, include: { user: true } });
    return _.map(roles, 'user');
  }

  public async createProvider({ phone, name }: CreateProviderDto): Promise<CarrierProvider> {
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
