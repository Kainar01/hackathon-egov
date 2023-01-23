import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { ShippingEntity } from '@/modules/shipping/entities/shipping.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';

import { DepotEntity } from './depot.entity';
import type { ParcelGroup } from '../interfaces/parcel-group.interface';

@Entity(TableName.PARCEL_GROUP)
@Check('"weight" > 0')
export class ParcelGroupEntity extends BaseEntity implements ParcelGroup {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  parcelGroupId!: number;

  @Column('int', { nullable: true })
  shippingId!: number | null;

  @Column('int')
  userId!: number;

  @Column('int')
  depotId!: number;

  @Column('numeric', { comment: 'Total shipping weight in kg' })
  weight!: number;

  @Column('text', { comment: 'Comment on parcel group box', nullable: true })
  comment!: string | null;

  @ManyToOne(() => ShippingEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'shippingId' })
  shipping?: ShippingEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ManyToOne(() => DepotEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'depotId' })
  depot?: DepotEntity;
}
