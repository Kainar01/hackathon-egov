import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@/prisma';

import { EgovApiService } from '../egov-api/egov-api.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly egovService: EgovApiService) {}

  public async findOne(userId: number): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('Пользователь не существует');
    }

    return user;
  }

  public async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  public async createByIIN(iin: string): Promise<User> {
    const egovUser = await this.egovService.getEgovUser(iin);
    if (!egovUser) {
      throw new BadRequestException('Неверный иин');
    }

    const data = await this.egovService.getPhone(iin);

    const phone = data.isExists ? data.phoneNumber : null;

    return this.create({
      iin,
      firstName: egovUser.firstName,
      lastName: egovUser.lastName,
      middleName: egovUser.middleName,
      phone,
    });
  }
}
