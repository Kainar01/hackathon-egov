import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TableName } from '@/common/enums/table';
import type { User } from '@/modules/user/interfaces/user.interface';

import type { CreateUntrackedParcelBodyDto } from '../dto/parcel-management/create-parcel.body.dto';
import { ParcelEntity } from '../entities/parcel.entity';
import { ParcelStatusType } from '../enum/parcel.enum';
import { ParcelService } from './parcel.service';

@Injectable()
export class ParcelManagementService {
  constructor(@InjectRepository(ParcelEntity) private parcelRepository: Repository<ParcelEntity>, private readonly parcel: ParcelService) {}

  public async createParcel(depotId: number, depotStaffId: number, { userCode, ...data }: CreateUntrackedParcelBodyDto): Promise<void> {
    const [orderUser] = <Pick<User, 'userId' | 'depotId'>[]> await this.parcelRepository.query(
      `
      SELECT u."userId", u."depotId" FROM "${TableName.USER}" AS u
        WHERE u."code" = $1
    `,
      [userCode],
    );

    if (!orderUser) {
      throw new BadRequestException(`Нет пользователя по коду ${userCode}`);
    }

    if (!orderUser.depotId) {
      throw new InternalServerErrorException('У пользователя нет выбранного склада');
    }

    // TODO: handle conflict error

    await this.parcel.saveParcel({
      ...data,
      departureDepotId: depotId,
      destinationDepotId: orderUser.depotId,
      creatorStaffId: depotStaffId,
      userId: orderUser.userId,
      status: ParcelStatusType.NEED_MANUAL_REGISTRATION,
    });

    // TODO: send notification to user about registaring parcel
  }
}
