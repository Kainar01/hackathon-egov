import { CityEntity } from '@/modules/address/entities/city.entity';
import { CountryEntity } from '@/modules/address/entities/coutry.entity';
import { UserDocumentEntity } from '@/modules/user/entities/user-document.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { VerificationEntity } from '@/modules/verification/verification.entity';

import { AddressEntity } from '../address/entities/address.entity';
import { BuyerRequestItemEntity } from '../buyer/entities/buyer-request-item.entity';
import { BuyerRequestEntity } from '../buyer/entities/buyer-request.entity';
import { DepotCarrierEntity } from '../depot/entities/depot-carrier.entity';
import { DepotStaffRoleEntity } from '../depot/entities/depot-staff-role.entity';
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
import { ShippingEventEntity } from '../shipping/entities/shipping-route-gate.entity';
import { ShippingEntity } from '../shipping/entities/shipping.entity';

export const ADMINJS_RESOURCES = [
  UserEntity,
  UserDocumentEntity,
  AddressEntity,
  CountryEntity,
  CityEntity,
  VerificationEntity,
  DepotEntity,
  DepotStaffEntity,
  DepotStaffRoleEntity,
  DepotCarrierEntity,
  RouteEntity,
  GateEntity,
  RouteGateEntity,
  ShippingEntity,
  ShippingEventEntity,
  CarrierEntity,
  ParcelEntity,
  ParcelGroupEntity,
  ParcelStatusEntity,
  ParcelItemEntity,
  BuyerRequestEntity,
  BuyerRequestItemEntity,
];
