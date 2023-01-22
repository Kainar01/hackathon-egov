import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import type { ParcelItem } from '../interfaces/parcel-item.interface';
import { ParcelEntity } from './parcel.entity';

@Entity(TableName.PARCEL_ITEM)
@Unique(['parcelId', 'title'])
@Check('quantity > 0')
@Check('price >= 0')
export class ParcelItemEntity extends BaseEntity implements ParcelItem {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  parcelItemId!: number;

  @Column('int')
  parcelId!: number;

  @Column('varchar')
  title!: string;

  @Column('int')
  quantity!: number;

  @Column('numeric', { precision: 10, scale: 2, comment: 'Unit price of the item' })
  price!: number;

  @ManyToOne(() => ParcelEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'parcelId' })
  parcel?: ParcelEntity;
}
