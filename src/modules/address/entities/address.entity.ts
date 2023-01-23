import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Address } from '../interfaces/address.interface';
import { CityEntity } from './city.entity';

@Entity(TableName.ADDRESS)
export class AddressEntity extends BaseEntity implements Address {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  addressId!: number;

  @Column('int')
  cityId!: number;

  @Column('text')
  address!: string;

  @Column('varchar', { nullable: true })
  phone!: string | null;

  @Column('varchar', { nullable: true })
  zip!: string | null;

  @Column('decimal', { nullable: true, precision: 8, scale: 6 })
  lat!: number | null;

  @Column('decimal', { nullable: true, precision: 9, scale: 6 })
  lng!: number | null;

  @ManyToOne(() => CityEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cityId' })
  city?: CityEntity;
}
