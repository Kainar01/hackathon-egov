import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { CityEntity } from '@/modules/address/entities/city.entity';
import { CountryEntity } from '@/modules/address/entities/coutry.entity';
import { Column, Entity, Check, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Depot } from '../interfaces/depot.interface';

@Entity(TableName.DEPOT)
@Check('"allowOrder" IS FALSE OR "buyerFee" IS NOT NULL')
export class DepotEntity extends BaseEntity implements Depot {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  depotId!: number;

  @Column('int')
  cityId!: number;

  @Column('int')
  countryId!: number;

  @Column('varchar')
  name!: string;

  @Column('decimal', { nullable: true })
  buyerFee!: number | null;

  @Column('text')
  address!: string;

  @Column('varchar')
  phone!: string;

  @Column('varchar')
  zip!: string;

  @Column('decimal', { precision: 8, scale: 6 })
  lat!: number;

  @Column('decimal', { precision: 9, scale: 6 })
  lng!: number;

  @Column('boolean', { default: false })
  allowOrder!: boolean;

  @ManyToOne(() => CountryEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'countryId' })
  country?: CountryEntity;

  @ManyToOne(() => CityEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cityId' })
  city?: CityEntity;
}
