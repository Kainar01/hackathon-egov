import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';

import { ShippingType } from '../enum/shipping.enum';
import type { Shipping } from '../interfaces/shipping.interface';
import { RouteEntity } from './route.entity';
import { CarrierEntity } from './carrier.entity';

@Entity(TableName.SHIPPING)
@Check('"weight" > 0')
export class ShippingEntity extends BaseEntity implements Shipping {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  shippingId!: number;

  @Column('int')
  carrierId!: number;

  @Column('int')
  routeId!: number;

  @Column('decimal', { comment: 'Fee per kg in percentage' })
  fee!: number;

  @Column('enum', { enum: ShippingType })
  type!: ShippingType;

  @Column('numeric', { comment: 'Total shipping weight in kg' })
  weight!: number;

  @ManyToOne(() => CarrierEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'carrierId' })
  carrier?: CarrierEntity;

  @ManyToOne(() => RouteEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'routeId' })
  route?: RouteEntity;
}
