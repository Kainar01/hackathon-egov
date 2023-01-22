import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';

import type { ShippingRouteGate } from '../interfaces/shipping-route-gate.interface';
import { RouteGateEntity } from './route-gate.entity';
import { ShippingEntity } from './shipping.entity';

@Entity(TableName.SHIPPING_ROUTE_GATE)
export class ShippingRouteGateEntity extends BaseEntity implements ShippingRouteGate {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  shippingRouteGateId!: number;

  @Column('int')
  shippingId!: number;

  @Column('int')
  routeGateId!: number;

  @Column('timestamptz', { nullable: true })
  arrival!: Date | null;

  @Column('timestamptz', { nullable: true })
  departure!: Date | null;

  @Column('boolean', { default: false })
  skipped!: boolean;

  @Column('text', { nullable: true })
  comment!: string;

  @ManyToOne(() => ShippingEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'shippingId' })
  shipping?: ShippingEntity;

  @ManyToOne(() => RouteGateEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'routeGateId' })
  routeGate?: RouteGateEntity;
}
