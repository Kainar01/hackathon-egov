import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { CityEntity } from '@/modules/country/entities/city.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Depot } from '../interfaces/depot.interface';

@Entity(TableName.DEPOT)
export class DepotEntity extends BaseEntity implements Depot {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  depotId!: number;

  @Column('int')
  cityId!: number;

  @Column('int', { nullable: true })
  addressId!: number;

  @Column('varchar')
  name!: string;

  @Column('decimal', { nullable: true })
  buyerFee!: number | null;

  @Column('decimal', { precision: 8, scale: 6 })
  lat!: number;

  @Column('decimal', { precision: 9, scale: 6 })
  lng!: number;

  @Column('boolean', { default: false })
  pickup!: boolean;

  @Column('int', { nullable: true })
  order!: number | null;

  @ManyToOne(() => CityEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cityId' })
  city?: CityEntity;
}
