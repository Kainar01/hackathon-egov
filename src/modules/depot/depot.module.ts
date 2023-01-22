import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { DepotStaffEntity } from './entities/depot-staff.entity';
import { DepotEntity } from './entities/depot.entity';
import { ParcelGroupEntity } from './entities/parcel-group.entity';
import { ParcelItemEntity } from './entities/parcel-item.entity';
import { ParcelStatusEntity } from './entities/parcel-status.entity';
import { ParcelEntity } from './entities/parcel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepotEntity,
      DepotStaffEntity,
      ParcelGroupEntity,
      ParcelEntity,
      ParcelItemEntity,
      ParcelStatusEntity,
    ]),
  ],
})
export class DepotModule {}
