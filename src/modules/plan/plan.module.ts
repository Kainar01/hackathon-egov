import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { PlanService } from './plan.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
