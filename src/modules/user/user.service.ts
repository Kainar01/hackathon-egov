import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(userId: number): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id: userId } });
  }

  public async findOrCreate(tgChatId: number): Promise<User> {
    return this.prisma.user.upsert({
      where: { tgChatId },
      update: {},
      create: {
        tgChatId,
      },
    });
  }
}
