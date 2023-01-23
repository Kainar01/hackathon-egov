import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { CarrierEntity } from '@/modules/shipping/entities/carrier.entity';

import { DepotEntity } from './depot.entity';
import type { DepotCarrier } from '../interfaces/depot-carrier.interface';

@Entity(TableName.DEPOT_CARRIER)
@Unique(['carrierId', 'depotId'])
export class DepotCarrierEntity extends BaseEntity implements DepotCarrier {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  depotCarrierId!: number;

  @Column('int')
  carrierId!: number;

  @Column('int')
  depotId!: number;

  @ManyToOne(() => DepotEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'depotId' })
  depot?: DepotEntity;

  @ManyToOne(() => CarrierEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'carrierId' })
  carrier?: CarrierEntity;
}
