import { CityEntity } from '@/modules/country/entities/city.entity';
import { CountryEntity } from '@/modules/country/entities/coutry.entity';
import { UserDocumentEntity } from '@/modules/user/entities/user-document.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { VerificationEntity } from '@/modules/verification/verification.entity';

import { DepotCarrierEntity } from '../depot/entities/depot-carrier.entity';
import { DepotStaffEntity } from '../depot/entities/depot-staff.entity';
import { DepotEntity } from '../depot/entities/depot.entity';
import { ParcelGroupEntity } from '../depot/entities/parcel-group.entity';
import { ParcelItemEntity } from '../depot/entities/parcel-item.entity';
import { ParcelStatusEntity } from '../depot/entities/parcel-status.entity';
import { ParcelEntity } from '../depot/entities/parcel.entity';
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
  DepotCarrierEntity,
  RouteEntity,
  GateEntity,
  RouteGateEntity,
  ShippingEntity,
  ShippingRouteGateEntity,
  CarrierEntity,
  ParcelEntity,
  ParcelGroupEntity,
  ParcelStatusEntity,
  ParcelItemEntity,
];
