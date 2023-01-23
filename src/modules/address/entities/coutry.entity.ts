import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { Country } from '../interfaces/country.interface';

@Entity(TableName.COUNTRY)
export class CountryEntity extends BaseEntity implements Country {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  countryId!: number;

  @Column('varchar', { unique: true })
  name!: string;

  @Column('varchar', { unique: true })
  code!: string;

  @Column('varchar', { unique: true })
  slug!: string;

  @Column('int', { nullable: true })
  order!: number | null;
}
