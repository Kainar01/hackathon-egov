import { Global, Module } from '@nestjs/common';

import { Logger } from './logger';
import { RequestContext } from './logger/request-context';
import { UtilService } from './providers/util.service';

const services = [Logger, RequestContext, UtilService];

@Global()
@Module({
  providers: services,
  exports: services,
})
export class CommonModule {}
