import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { DepotEntity } from '@/modules/depot/entities/depot.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import type { Buyer } from '../interfaces/buyer.interface';

@Entity(TableName.BUYER)
@Unique(['userId', 'depotId'])
export class BuyerEntity extends BaseEntity implements Buyer {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  buyerId!: number;

  @Column('int')
  depotId!: number;

  @Column('int')
  userId!: number;

  @ManyToOne(() => DepotEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'depotId' })
  depot?: DepotEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
