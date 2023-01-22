import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import  { DepotStaffRole } from '../enum/depot-staff.enum';
import type { DepotStaff } from '../interfaces/depot-staff.interface';
import { DepotEntity } from './depot.entity';

@Entity(TableName.DEPOT_STAFF)
export class DepotStaffEntity extends BaseEntity implements DepotStaff {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  depotStaffId!: number;

  @Column('int')
  userId!: number;

  @Column('int')
  depotId!: number;

  @Column('enum', { enum: DepotStaffRole })
  role!: DepotStaffRole;

  @ManyToOne(() => DepotEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED'
  })
  @JoinColumn({ name: 'depotId' })
  depot?: DepotEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED'
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
