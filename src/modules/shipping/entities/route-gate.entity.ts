import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { RouteGate } from '../interfaces/route-gate.interface';
import { GateEntity } from './gate.entity';
import { RouteEntity } from './route.entity';

@Entity(TableName.ROUTE_GATE)
@Check('"gateId" <> "nextGateId"')
export class RouteGateEntity extends BaseEntity implements RouteGate {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  routeGateId!: number;

  @Column('int')
  routeId!: number;

  @Column('int', { comment: 'Departure gate' })
  gateId!: number;

  @Column('int', { comment: 'Next destination gate' })
  nextGateId!: number;

  @Column('varchar', { nullable: true, comment: 'Time taken between two gates' })
  time!: string | null;

  @Column('varchar', { nullable: true, comment: 'Distance between two gates' })
  distance!: string | null;

  @Column('int')
  order!: number;

  @ManyToOne(() => GateEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'gateId' })
  gate?: GateEntity;

  @ManyToOne(() => GateEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'nextGateId' })
  nextGate?: GateEntity;

  @ManyToOne(() => RouteEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'routeId' })
  route?: RouteEntity;
}
