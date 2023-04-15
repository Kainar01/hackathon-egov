import { Global, Module } from '@nestjs/common';

import { Logger } from './logger';
import { RequestContext } from './logger/request-context';
import { S3Service } from './providers/s3.service';
import { UtilService } from './providers/util.service';

const services = [Logger, RequestContext, S3Service, UtilService];

@Global()
@Module({
  providers: services,
  exports: services,
})
export class CommonModule {}
