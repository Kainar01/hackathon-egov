import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import type { CityResponseDto } from './dto/city.response.dto';
import type { CountryResponseDto } from './dto/country.response.dto';
import { CityEntity } from './entities/city.entity';
import { CountryEntity } from './entities/coutry.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(CountryEntity) private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  public async getCountries(): Promise<CountryResponseDto[]> {
    return this.countryRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  public async getCities(countryId: number): Promise<CityResponseDto[]> {
    return this.cityRepository.find({
      order: {
        name: 'ASC',
      },
      where: {
        countryId,
      },
    });
  }
}
