import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';

import { DepotStaffRoleType } from '../enum/depot-staff.enum';
import { DepotEntity } from './depot.entity';
import type { DepotStaffRole } from '../interfaces/depot-staff-role.interface';
import { DepotStaffEntity } from './depot-staff.entity';

@Entity(TableName.DEPOT_STAFF_ROLE)
@Unique(['depotStaffId', 'depotId', 'role'])
export class DepotStaffRoleEntity extends BaseEntity implements DepotStaffRole {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  depotStaffRoleId!: number;

  @Column('int')
  depotStaffId!: number;

  @Column('int')
  depotId!: number;

  @Column('enum', { enum: DepotStaffRoleType })
  role!: DepotStaffRoleType;

  @Column('timestamptz', { nullable: true, default: null })
  deactivatedAt!: Date | null;

  @ManyToOne(() => DepotEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'depotId' })
  depot?: DepotEntity;

  @ManyToOne(() => DepotStaffEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'depotStaffId' })
  depotStaff?: DepotStaffEntity;
}
