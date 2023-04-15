import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
