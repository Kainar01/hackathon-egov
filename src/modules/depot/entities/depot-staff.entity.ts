import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { DepotStaff } from '../interfaces/depot-staff.interface';

@Entity(TableName.DEPOT_STAFF)
export class DepotStaffEntity extends BaseEntity implements DepotStaff {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  depotStaffId!: number;

  @Column('int', { unique: true })
  userId!: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
