import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { DepotEntity } from '@/modules/depot/entities/depot.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BuyerRequestStatus } from '../enums/buyer-request.enum';
import type { BuyerRequest } from '../interfaces/buyer-request.interface';
import { BuyerEntity } from './buyer.entity';

@Entity(TableName.BUYER_REQUEST)
@Check('"total" >= 0')
export class BuyerRequestEntity extends BaseEntity implements BuyerRequest {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  buyerRequestId!: number;

  @Column('int')
  depotId!: number;

  @Column('int')
  userId!: number;

  @Column('int', { nullable: true })
  buyerId!: number | null;

  @Column('enum', { enum: BuyerRequestStatus })
  status!: BuyerRequestStatus;

  @Column('text', { nullable: true })
  comment!: string | null;

  @Column('numeric', { precision: 10, scale: 2 })
  total!: number;

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

  @ManyToOne(() => BuyerEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'buyerId' })
  buyer?: BuyerEntity;
}
