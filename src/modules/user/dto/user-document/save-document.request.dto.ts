import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserDocumentType } from '../../enums/user-document.enum';

export class SaveDocumentBodyDto {
  @IsEnum(UserDocumentType)
  @IsNotEmpty()
  documentType!: UserDocumentType;
}
