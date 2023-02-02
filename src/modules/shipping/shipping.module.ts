import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { CarrierEntity } from './entities/carrier.entity';
import { GateEntity } from './entities/gate.entity';
import { RouteGateEntity } from './entities/route-gate.entity';
import { RouteEntity } from './entities/route.entity';
import { ShippingEventEntity } from './entities/shipping-route-gate.entity';
import { ShippingEntity } from './entities/shipping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    RouteEntity,
    GateEntity,
    RouteGateEntity,
    ShippingEntity,
    CarrierEntity,
    ShippingEventEntity,
  ])],
})
export class ShippingModule {}
