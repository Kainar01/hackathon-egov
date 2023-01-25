import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { CityEntity } from '@/modules/address/entities/city.entity';
import { CountryEntity } from '@/modules/address/entities/coutry.entity';
import { DepotEntity } from '@/modules/depot/entities/depot.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../enums/role.enum';
import type { User, UserPicture } from '../interfaces/user.interface';

@Entity(TableName.USER)
@Check('email = lower(email)')
@Check('balance >= 0')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  userId!: number;

  @Column('varchar', { comment: 'Unique code that will be used in user address', unique: true })
  code!: string;

  @Column('varchar', { nullable: true })
  firstName!: string | null;

  @Column('varchar', { nullable: true })
  lastName!: string | null;

  @Column('varchar', { nullable: true })
  middleName!: string | null;

  @Column('varchar', { unique: true, nullable: true })
  iin!: string | null;

  @Column('varchar', { unique: true, nullable: true })
  email!: string;

  @Column('enum', { enum: RoleType, nullable: true })
  role!: RoleType | null;

  @Column('text', { unique: true })
  phone!: string;

  @Column('varchar', { nullable: true })
  password!: string;

  @Column('numeric', { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column('int', { nullable: true })
  cityId!: number | null;

  @Column('int', { nullable: true })
  depotId!: number | null;

  @Column('int', { nullable: true })
  countryId!: number | null;

  @Column('jsonb', { nullable: true })
  picture!: UserPicture | null;

  @Column('timestamptz', { nullable: true })
  birthDate!: Date | null;

  @Column('boolean', { default: false })
  isVerified!: boolean;

  @ManyToOne(() => CityEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cityId' })
  city?: CityEntity;

  @ManyToOne(() => CountryEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'countryId' })
  country?: CountryEntity;

  @ManyToOne(() => DepotEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'depotId' })
  depot?: DepotEntity;
}
