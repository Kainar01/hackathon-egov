import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { AddressEntity } from '@/modules/address/entities/address.entity';
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
  countryId!: number;

  @Column('int')
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
  allowOrder!: boolean;

  @Column('int', { nullable: true })
  order!: number | null;

  @ManyToOne(() => CountryEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'countryId' })
  country?: CountryEntity;

  @ManyToOne(() => AddressEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'addressId' })
  address?: AddressEntity;
}
