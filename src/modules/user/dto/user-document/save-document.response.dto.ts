import { ApiProperty } from '@nestjs/swagger';
import type { UserDocumentType } from '../../enums/user-document.enum';

export class SaveDocumentResponseDto {
  @ApiProperty()
  userDocumentId!: number;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  documentType!: UserDocumentType;

  @ApiProperty()
  isVerified!: boolean;

  @ApiProperty()
  fileUrl!: string;

  @ApiProperty()
  mimeType!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
