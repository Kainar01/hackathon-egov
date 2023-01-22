import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { UserDocumentEntity } from './entities/user-document.entity';
import { UserEntity } from './entities/user.entity';
import { UserDocumentService } from './services/user-document.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, UserDocumentEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserDocumentService],
  exports: [UserService],
})
export class UserModule {}
