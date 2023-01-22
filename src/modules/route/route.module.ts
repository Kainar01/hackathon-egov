import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { RouteEntity } from './entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteEntity])],
})
export class DepotModule {}
