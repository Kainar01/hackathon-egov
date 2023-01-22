import { CityEntity } from '@/modules/country/entities/city.entity';
import { CountryEntity } from '@/modules/country/entities/coutry.entity';
import { UserDocumentEntity } from '@/modules/user/entities/user-document.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { VerificationEntity } from '@/modules/verification/verification.entity';

import { DepotStaffEntity } from '../depot/entities/depot-staff.entity';
import { DepotEntity } from '../depot/entities/depot.entity';
import { CarrierEntity } from '../shipping/entities/carrier.entity';
import { GateEntity } from '../shipping/entities/gate.entity';
import { RouteGateEntity } from '../shipping/entities/route-gate.entity';
import { RouteEntity } from '../shipping/entities/route.entity';
import { ShippingRouteGateEntity } from '../shipping/entities/shipping-route-gate.entity';
import { ShippingEntity } from '../shipping/entities/shipping.entity';

export const ADMINJS_RESOURCES = [
  UserEntity,
  UserDocumentEntity,
  CountryEntity,
  CityEntity,
  VerificationEntity,
  DepotEntity,
  DepotStaffEntity,
  RouteEntity,
  GateEntity,
  RouteGateEntity,
  ShippingEntity,
  ShippingRouteGateEntity,
  CarrierEntity,
];
