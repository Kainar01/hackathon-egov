import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TableName } from '@/common/enums/table';
import type { User } from '@/modules/user/interfaces/user.interface';

import type { CreateParcelBodyDto } from '../dto/parcel-management/create-parcel.body.dto';
import { ParcelStatusEntity } from '../entities/parcel-status.entity';
import { ParcelEntity } from '../entities/parcel.entity';
import { ParcelStatusType } from '../enum/parcel.enum';

@Injectable()
export class ParcelManagementService {
  constructor(@InjectRepository(ParcelEntity) private parcelRepository: Repository<ParcelEntity>) {}

  public async createParcel(depotId: number, depotStaffId: number, { userCode, ...data }: CreateParcelBodyDto): Promise<void> {
    const [orderUser] = <Pick<User, 'userId'>[]> await this.parcelRepository.query(
      `
      SELECT u."userId" FROM "${TableName.USER}" AS u
        WHERE u."code" = $1
    `,
      [userCode],
    );

    if (!orderUser) {
      throw new BadRequestException(`Нет пользователя по коду ${userCode}`);
    }

    // TODO: handle conflict error

    const parcel = await this.parcelRepository.save({
      ...data,
      departureDepotId: depotId,
      creatorStaffId: depotStaffId,
      userId: orderUser.userId,
      status: ParcelStatusType.NEED_MANUAL_REGISTRATION,
    });

    // saving status change history
    await this.parcelRepository.manager.save(ParcelStatusEntity, {
      parcelId: parcel.parcelId,
      type: ParcelStatusType.NEED_MANUAL_REGISTRATION,
    });

    // TODO: send notification to user about registaring parcel
  }
}
