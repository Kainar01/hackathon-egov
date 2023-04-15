import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(userId: number): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id: userId } });
  }
}
