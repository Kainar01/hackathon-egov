import { CityEntity } from '@/modules/country/entities/city.entity';
import { CountryEntity } from '@/modules/country/entities/coutry.entity';
import { UserDocumentEntity } from '@/modules/user/entities/user-document.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { VerificationEntity } from '@/modules/verification/verification.entity';

import { DepotStaffEntity } from '../depot/entities/depot-staff.entity';
import { DepotEntity } from '../depot/entities/depot.entity';

export const ADMINJS_RESOURCES = [
  UserEntity,
  UserDocumentEntity,
  CountryEntity,
  CityEntity,
  VerificationEntity,
  DepotEntity,
  DepotStaffEntity,
];
