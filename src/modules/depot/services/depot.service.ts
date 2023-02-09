import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import type { Repository } from 'typeorm';

import { CityEntity } from '@/modules/address/entities/city.entity';

import type { CreateDepotBodyDto } from '../dto/create-depot.body.dto';
import type { DepotResponseDto } from '../dto/depot.response.dto';
import type { GetDepotsQueryDto } from '../dto/get-depots.query.dto';
import type { UpdateDepotBodyDto } from '../dto/update-depot.body.dto';
import type { Depot } from '../interfaces/depot.interface';
import type { DepotRepository } from '../repositories/depot.repository';

@Injectable()
export class DepotService {
  constructor(
    private readonly depotRepository: DepotRepository,
    @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,
  ) {}

  public async getDepots(query: GetDepotsQueryDto): Promise<DepotResponseDto[]> {
    return this.depotRepository.findDepots(query);
  }

  public async createDepot(data: CreateDepotBodyDto): Promise<DepotResponseDto> {
    // TODO: validate lat lng are in city location
    const city = await this.cityRepository.findOneBy({ cityId: data.cityId });

    if (!city) {
      throw new BadRequestException('Такого города не существует');
    }

    const depot = await this.depotRepository.save({ ...data, countryId: city.countryId });

    return _.pick(depot, ['depotId', 'name', 'address', 'phone', 'zip', 'lat', 'lng', 'buyerFee', 'allowOrder']);
  }

  public async updateDepot(depotId: number, data: UpdateDepotBodyDto): Promise<void> {
    let updateData: Partial<Depot> = { ...data };

    if (data.cityId) {
      const city = await this.cityRepository.findOneBy({ cityId: data.cityId });

      if (!city) {
        throw new BadRequestException('Такого города не существует');
      }

      updateData = { ...data, countryId: city.countryId };
    }

    await this.depotRepository.save({ ...updateData, depotId });
  }

  public async deleteDepot(depotId: number): Promise<void> {
    await this.depotRepository.delete(depotId);
  }
}
