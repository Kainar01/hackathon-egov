import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EgovApiController } from './egov-api.controller';
import { EgovApiService } from './egov-api.service';

@Module({
  controllers: [EgovApiController],
  imports: [HttpModule],
  providers: [EgovApiService],
  exports: [EgovApiService],
})
export class EgovApiModule {}
