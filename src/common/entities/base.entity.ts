import { BaseEntity as TypeormBaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseEntity extends TypeormBaseEntity {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: string;
}
