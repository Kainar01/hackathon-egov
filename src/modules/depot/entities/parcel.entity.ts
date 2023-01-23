import { Column, Entity, Check, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { UserEntity } from '@/modules/user/entities/user.entity';

import { DepotEntity } from './depot.entity';
import { ParcelStatusEntity } from './parcel-status.entity';
import { ParcelGroupEntity } from './parcel-group.entity';
import type { Parcel } from '../interfaces/parcel.interface';

@Entity(TableName.PARCEL)
@Check('"departureDepotId" <> "destinationDepotId"')
@Check('"total" >= 0 AND "buyerFee" >= 0')
@Check('"weight" > 0')
export class ParcelEntity extends BaseEntity implements Parcel {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  parcelId!: number;

  @Column('int')
  userId!: number;

  @Column('int')
  departureDepotId!: number;

  @Column('int')
  destinationDepotId!: number;

  @Column('int', { nullable: true })
  parcelGroupId!: number | null;

  @Column('int', { nullable: true })
  parcelStatusId!: number | null;

  @Column('varchar', { unique: true })
  trackingCode!: string;

  @Column('numeric', { precision: 10, scale: 2, comment: 'Total price of the order' })
  total!: number;

  @Column('numeric', { precision: 10, scale: 2, default: 0, comment: 'Total fee of the buyer' })
  buyerFee!: number;

  @Column('numeric', { comment: 'Total shipping weight in kg' })
  weight!: number;

  @Column('text', { comment: 'Comment on parcel', nullable: true })
  comment!: string | null;

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
  @JoinColumn({ name: 'departureDepotId' })
  departureDepot?: DepotEntity;

  @ManyToOne(() => DepotEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'destinationDepotId' })
  destinationDepot?: DepotEntity;

  @ManyToOne(() => ParcelStatusEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'parcelStatusId' })
  parcelStatus?: ParcelStatusEntity;

  @ManyToOne(() => ParcelGroupEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'parcelGroupId' })
  parcelGroup?: ParcelGroupEntity;
}
