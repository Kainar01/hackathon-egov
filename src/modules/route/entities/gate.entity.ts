import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { CountryEntity } from '@/modules/country/entities/coutry.entity';
import { DepotEntity } from '@/modules/depot/entities/depot.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Gate } from '../interfaces/gate.interface';

@Entity(TableName.GATE)
@Check('("lat" IS NOT NULL AND "lng" IS NOT NULL) OR "depotId" IS NOT NULL')
export class GateEntity extends BaseEntity implements Gate {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  gateId!: number;

  @Column('int')
  countryId!: number;

  @Column('int', { nullable: true })
  depotId!: number | null;

  @Column('varchar')
  name!: string;

  @Column('text', { nullable: true })
  description!: string | null;

  @Column('decimal', { precision: 8, scale: 6, nullable: true })
  lat!: number | null;

  @Column('decimal', { precision: 9, scale: 6, nullable: true })
  lng!: number | null;

  @ManyToOne(() => DepotEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'depotId' })
  depot?: DepotEntity;

  @ManyToOne(() => CountryEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'countryId' })
  country?: CountryEntity;
}
