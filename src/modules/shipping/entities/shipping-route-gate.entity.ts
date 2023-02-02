import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';

import type { ShippingEvent } from '../interfaces/shipping-event.interface';
import { ShippingEntity } from './shipping.entity';
import { GateEntity } from './gate.entity';
import { ShippingEventType } from '../enum/shipping-event.enum';

@Entity(TableName.SHIPPING_EVENT)
export class ShippingEventEntity extends BaseEntity implements ShippingEvent {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  shippingEventId!: number;

  @Column('int')
  shippingId!: number;

  @Column('int', { nullable: true })
  gateId!: number | null;

  @Column('timestamptz', { nullable: true })
  arrival!: Date | null;

  @Column('timestamptz', { nullable: true })
  departure!: Date | null;

  @Column('boolean', { default: false })
  skipped!: boolean;

  @Column('text', { nullable: true })
  comment!: string;

  @Column('enum', { enum: ShippingEventType })
  type!: ShippingEventType;

  @ManyToOne(() => ShippingEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'shippingId' })
  shipping?: ShippingEntity;

  @ManyToOne(() => GateEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'gateId' })
  gate?: GateEntity;
}
