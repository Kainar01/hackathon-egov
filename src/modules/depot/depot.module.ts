import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { DepotEntity } from './entities/depot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepotEntity])],
})
export class DepotModule {}
