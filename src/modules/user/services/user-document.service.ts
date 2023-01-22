import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { EntityManager, Repository } from 'typeorm';

import { S3Service } from '@/common/providers/s3.service';
import { UtilService } from '@/common/providers/util.service';

import type { SaveDocumentBodyDto } from '../dto/user-document/save-document.request.dto';
import type { SaveDocumentResponseDto } from '../dto/user-document/save-document.response.dto';
import { UserDocumentEntity } from '../entities/user-document.entity';

@Injectable()
export class UserDocumentService {
  private readonly S3_ATTACHMENT_DIR: string = 'documents';

  constructor(
    @InjectRepository(UserDocumentEntity) private readonly userDocumentRepository: Repository<UserDocumentEntity>,
    private readonly s3: S3Service,
    private readonly utils: UtilService,
  ) {}

  public async saveDocument(file: Express.Multer.File, data: SaveDocumentBodyDto, em?: EntityManager): Promise<SaveDocumentResponseDto> {
    const manager = em || this.userDocumentRepository.manager;

    const fileUrl = this.utils.generateRandomFileKey(file, this.S3_ATTACHMENT_DIR);

    await this.s3.uploadFile(fileUrl, file.buffer);

    return manager.getRepository(UserDocumentEntity).save({
      ...data,
      fileUrl,
      mimeType: file.mimetype,
    });
  }
}
