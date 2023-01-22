import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { SmsService } from './sms.service';
import { VerificationEntity } from './verification.entity';
import { VerificationService } from './verification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationEntity]),
    HttpModule,
  ],
  providers: [VerificationService, SmsService],
  exports: [VerificationService],
})
export class VerificationModule {}
