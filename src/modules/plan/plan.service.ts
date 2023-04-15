import { Injectable } from '@nestjs/common';
import { Plan } from '@prisma/client';

import { PrismaService } from '@/prisma';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(planId: number): Promise<Plan | null> {
    return this.prisma.plan.findFirst({ where: { id: planId } });
  }
}
