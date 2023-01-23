import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ParcelStatusType } from '../enum/parcel.enum';
import type { ParcelStatus } from '../interfaces/parcel-status.interface';
import { ParcelEntity } from './parcel.entity';

@Entity(TableName.PARCEL_STATUS)
@Unique(['parcelId', 'type'])
export class ParcelStatusEntity extends BaseEntity implements ParcelStatus {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  parcelStatusId!: number;

  @Column('int')
  parcelId!: number;

  @Column('enum', { enum: ParcelStatusType })
  type!: ParcelStatusType;

  @Column('text', { nullable: true })
  comment!: string | null;

  @ManyToOne(() => ParcelEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'parcelId' })
  parcel?: ParcelEntity;
}
