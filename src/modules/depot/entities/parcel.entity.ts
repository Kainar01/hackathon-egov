import { Column, Entity, Check, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { UserEntity } from '@/modules/user/entities/user.entity';

import { DepotEntity } from './depot.entity';
import { ParcelGroupEntity } from './parcel-group.entity';
import type { Parcel } from '../interfaces/parcel.interface';
import { ParcelStatusType } from '../enum/parcel.enum';
import { DepotStaffEntity } from './depot-staff.entity';

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

  @Column('int', {nullable: true})
  destinationDepotId!: number | null;

  @Column('int', { nullable: true })
  parcelGroupId!: number | null;

  @Index()
  @Column('enum', { enum: ParcelStatusType, default: ParcelStatusType.REGISTRATION_PENDING })
  parcelStatus!: ParcelStatusType;

  @Column('varchar', { unique: true })
  trackingCode!: string;

  @Column('numeric', { precision: 10, scale: 2, comment: 'Total price of the order', nullable: true })
  total!: number | null;

  @Column('numeric', { precision: 10, scale: 2, default: 0, comment: 'Total fee of the buyer', nullable: true })
  buyerFee!: number | null;

  @Column('numeric', { comment: 'Total shipping weight in kg', nullable: true })
  weight!: number | null;

  @Column('int', { nullable: true })
  creatorStaffId!: number | null;

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

  @ManyToOne(() => ParcelGroupEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'parcelGroupId' })
  parcelGroup?: ParcelGroupEntity;

  @ManyToOne(() => DepotStaffEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'creatorStaffId' })
  creatorStaff?: DepotStaffEntity;
}
