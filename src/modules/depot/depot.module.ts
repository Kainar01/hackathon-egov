import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { DepotAdminController } from './controllers/admin.controller';
import { DepotParcelController } from './controllers/depot-parcel.controller';
import { DepotCarrierEntity } from './entities/depot-carrier.entity';
import { DepotStaffEntity } from './entities/depot-staff.entity';
import { DepotEntity } from './entities/depot.entity';
import { ParcelGroupEntity } from './entities/parcel-group.entity';
import { ParcelItemEntity } from './entities/parcel-item.entity';
import { ParcelStatusEntity } from './entities/parcel-status.entity';
import { ParcelEntity } from './entities/parcel.entity';
import { DepotService } from './services/depot.service';
import { ParcelManagementService } from './services/parcel-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepotEntity,
      DepotStaffEntity,
      ParcelGroupEntity,
      ParcelEntity,
      ParcelItemEntity,
      ParcelStatusEntity,
      DepotCarrierEntity,
    ]),
  ],
  controllers: [DepotAdminController, DepotParcelController],
  providers: [DepotService, ParcelManagementService],
})
export class DepotModule {}
