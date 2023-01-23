import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';

import { BuyerRequestEntity } from './buyer-request.entity';
import type { BuyerRequestItem } from '../interfaces/buyer-request-item.interface';

@Entity(TableName.BUYER_REQUEST_ITEM)
@Check('"price" >= 0')
@Check('"quantity" > 0')
@Unique(['buyerRequestId', 'title'])
export class BuyerRequestItemEntity extends BaseEntity implements BuyerRequestItem {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  buyerRequestItemId!: number;

  @Column('int')
  buyerRequestId!: number;

  @Column('varchar')
  title!: string;

  @Column('text')
  link!: string;

  @Column('varchar', { nullable: true })
  color!: string | null;

  @Column('varchar', { nullable: true })
  size!: string | null;

  @Column('numeric', { precision: 10, scale: 2 })
  price!: number;

  @Column('int')
  quantity!: number;

  @ManyToOne(() => BuyerRequestEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'buyerRequestId' })
  buyerRequest?: BuyerRequestEntity;
}
