import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { BuyerRequestItemEntity } from './entities/buyer-request-item.entity';
import { BuyerRequestEntity } from './entities/buyer-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuyerRequestEntity,
      BuyerRequestItemEntity,
    ]),
  ],
})
export class BuyerModule {}
