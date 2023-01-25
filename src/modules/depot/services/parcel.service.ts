import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, InsertResult } from 'typeorm';

import { TableName } from '@/common/enums/table';
import type { UserPayload } from '@/modules/auth/auth.interface';

import type { CreateParcelBodyDto } from '../dto/parcel/create-parcel.body.dto';
import { ParcelItemEntity } from '../entities/parcel-item.entity';
import { ParcelStatusEntity } from '../entities/parcel-status.entity';
import { ParcelEntity } from '../entities/parcel.entity';
import { ParcelStatusType } from '../enum/parcel.enum';
import type { Parcel } from '../interfaces/parcel.interface';

@Injectable()
export class ParcelService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async createParcel(depotId: number, user: UserPayload, { items, ...data }: CreateParcelBodyDto): Promise<void> {
    const [parcelUser] = await this.entityManager.query(
      `
      SELECT u."depotId" FROM "${TableName.USER}" AS u
        WHERE u."userId" = $1
    `,
      [user.userId],
    );

    if (!parcelUser) {
      throw new InternalServerErrorException('Пользователь не существует');
    }

    if (!parcelUser.depotId) {
      throw new InternalServerErrorException('У пользователя нет выбранного склада');
    }
    // TODO: handle conflict error

    await this.entityManager.transaction(async (em: EntityManager) => {
      const total = items.reduce(
        (parcelTotal: number, item: CreateParcelBodyDto['items'][number]) => parcelTotal + item.price * item.quantity,
        0,
      );
      const parcel = await this.saveParcel(
        {
          ...data,
          total,
          departureDepotId: depotId,
          destinationDepotId: parcelUser.depotId,
          userId: user.userId,
          status: ParcelStatusType.REGISTRATION_PENDING,
        },
        em,
      );

      await em
        .createQueryBuilder(ParcelItemEntity, 'pi')
        .insert()
        .values(items.map((item: CreateParcelBodyDto['items'][number]) => ({ ...item, parcelId: parcel.parcelId })))
        .execute();
      // TODO: send notification to user about registaring parcel
    });
  }

  public async saveParcel(data: Partial<ParcelEntity>, em?: EntityManager): Promise<Parcel> {
    const entityManager = em || this.entityManager;

    const parcel = await entityManager
      .createQueryBuilder(ParcelEntity, 'p')
      .insert()
      .values(data)
      .orUpdate(['trackingCode'], ['trackingCode'])
      .returning('p.*, (xmax = 0) AS inserted')
      .execute()
      .then(({ raw }: InsertResult) => <{ inserted: boolean } & Parcel>raw[0]);

    if (!parcel.inserted) {
      throw new BadRequestException('Такой трэкинг номер уже есть в системе');
    }

    // saving status change history
    await entityManager.save(ParcelStatusEntity, {
      parcelId: parcel.parcelId,
      type: parcel.status,
    });

    return parcel;
  }
}
