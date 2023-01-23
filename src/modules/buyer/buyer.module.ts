import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { BuyerRequestItemEntity } from './entities/buyer-request-item.entity';
import { BuyerRequestEntity } from './entities/buyer-request.entity';
import { BuyerEntity } from './entities/buyer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuyerEntity,
      BuyerRequestEntity,
      BuyerRequestItemEntity,
    ]),
  ],
})
export class BuyerModule {}
