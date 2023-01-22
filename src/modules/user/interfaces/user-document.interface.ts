import type { BaseEntity } from '@/common/entities/base.entity';

import type { UserDocumentType } from '../enums/user-document.enum';

export interface UserDocument extends BaseEntity {
  userDocumentId: number;
  userId: number;
  documentType: UserDocumentType;
  fileUrl: string;
  mimeType: string;
  isVerified: boolean;
}
