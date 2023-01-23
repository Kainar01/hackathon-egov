import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UseCache } from '@/common/decorators/cache.decorator';

import { CountryService } from './country.service';
import { CityResponseDto } from './dto/city.response.dto';
import { CountryResponseDto } from './dto/country.response.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly country: CountryService) {}

  @UseCache()
  @ApiResponse({ type: [CountryResponseDto] })
  @Get('')
  public async getCountries(): Promise<CountryResponseDto[]> {
    return this.country.getCountries();
  }

  @UseCache()
  @ApiResponse({ type: [CityResponseDto] })
  @Get(':country')
  public async getCities(@Param('country') country: number): Promise<CityResponseDto[]> {
    return this.country.getCities(country);
  }
}
