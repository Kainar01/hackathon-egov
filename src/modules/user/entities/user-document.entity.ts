import { BaseEntity } from '@/common/entities/base.entity';
import { TableName } from '@/common/enums/table';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserDocumentType } from '../enums/user-document.enum';
import type { UserDocument } from '../interfaces/user-document.interface';
import { UserEntity } from './user.entity';

@Entity(TableName.USER_DOCUMENT)
@Unique(['userId', 'documentType'])
export class UserDocumentEntity extends BaseEntity implements UserDocument {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  userDocumentId!: number;

  @Column('int')
  userId!: number;

  @Column('varchar')
  fileUrl!: string;

  @Column('boolean', { default: false })
  isVerified!: boolean;

  @Column('varchar')
  mimeType!: string;

  @Column('enum', { enum: UserDocumentType })
  documentType!: UserDocumentType;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
