import { User } from '@prisma/client';
import _ from 'lodash';

import { PrismaService } from '@/prisma';

import { EgovApiService } from '../egov-api/egov-api.service';
import { Role } from '../user/user.enum';
import { CreateOperatorDto } from './dto/create-operator.dto';

export class AdminService {
  constructor(private readonly prisma: PrismaService, private readonly egovService: EgovApiService) {}

  public async createOperator(data: CreateOperatorDto): Promise<User> {
    const user = await this.prisma.user.create({ data });
    await this.prisma.userRole.create({ data: { userId: user.id, role: Role.OPERATOR } });

    await this.egovService.sendSMS({
      phone: data.phone,
      smsText: 'Вас назначили оператором в egov. Зайдите в личный кабинет используя этот номер',
    });

    return user;
  }

  public async findOperators(): Promise<User[]> {
    const roles = await this.prisma.userRole.findMany({ where: { role: Role.ADMIN }, include: { user: true } });
    return _.map(roles, 'user');
  }
}
