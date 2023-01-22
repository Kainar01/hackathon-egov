import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import type { City } from '../interfaces/city.interface';
import { CountryEntity } from './coutry.entity';

@Entity(TableName.CITY)
@Unique(['countryId', 'name'])
@Unique(['countryId', 'slug'])
export class CityEntity extends BaseEntity implements City {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  cityId!: number;

  @Column('int')
  countryId!: number;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  slug!: string;

  @Column('decimal', { nullable: true, precision: 8, scale: 6 })
  lat!: number | null;

  @Column('decimal', { nullable: true, precision: 9, scale: 6 })
  lng!: number | null;

  @Column('int', { nullable: true })
  order!: number | null;

  @ManyToOne(() => CountryEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'countryId' })
  country?: CountryEntity;
}
