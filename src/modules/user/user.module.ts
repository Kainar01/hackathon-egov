import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma';

import { EgovApiModule } from '../egov-api/egov-api.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, EgovApiModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
