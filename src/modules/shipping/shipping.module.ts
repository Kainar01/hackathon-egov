import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { GateEntity } from './entities/gate.entity';
import { RouteGateEntity } from './entities/route-gate.entity';
import { RouteEntity } from './entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteEntity, GateEntity, RouteGateEntity])],
})
export class ShippingModule {}
