import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { AddressEntity } from './entities/address.entity';
import { CityEntity } from './entities/city.entity';
import { CountryEntity } from './entities/coutry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, CityEntity, AddressEntity])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class AddressModule {}
