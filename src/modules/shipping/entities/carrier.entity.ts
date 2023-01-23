import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';

import type { Carrier } from '../interfaces/carrier.interface';
import { UserEntity } from '@/modules/user/entities/user.entity';

@Entity(TableName.CARRIER)
@Unique(['carrierId', 'userId'])
export class CarrierEntity extends BaseEntity implements Carrier {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  carrierId!: number;

  @Column('int')
  userId!: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
