import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CityEntity } from './entities/city.entity';
import { CountryEntity } from './entities/coutry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, CityEntity])],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [],
})
export class CountryModule {}
