import { BadRequestException, Injectable } from '@nestjs/common';
import _ from 'lodash';

import { TableName } from '@/common/enums/table';

import type { CreateDepotBodyDto } from '../dto/create-depot.body.dto';
import type { DepotResponseDto } from '../dto/depot.response.dto';
import type { GetDepotsQueryDto } from '../dto/get-depots.query.dto';
import type { UpdateDepotBodyDto } from '../dto/update-depot.body.dto';
import type { Depot, DepotCity } from '../interfaces/depot.interface';
import type { DepotRepository } from '../repositories/depot.repository';

@Injectable()
export class DepotService {
  constructor(private readonly depotRepository: DepotRepository) {}

  public async getDepots(query: GetDepotsQueryDto): Promise<DepotResponseDto[]> {
    return this.depotRepository.findDepots(query);
  }

  public async createDepot(data: CreateDepotBodyDto): Promise<DepotResponseDto> {
    // TODO: validate lat lng are in city location
    const { country, ...city } = await this.getDepotCity(data.cityId);

    const depot = await this.depotRepository.save({ ...data, countryId: country.countryId });

    return {
      ..._.pick(depot, ['depotId', 'name', 'address', 'phone', 'zip', 'lat', 'lng', 'buyerFee', 'allowOrder']),
      city,
      country,
    };
  }

  public async updateDepot(depotId: number, data: UpdateDepotBodyDto): Promise<void> {
    let updateData: Partial<Depot> = { ...data };

    if (data.cityId) {
      const { country } = await this.getDepotCity(data.cityId);

      updateData = { ...data, countryId: country.countryId };
    }

    await this.depotRepository.save({ ...updateData, depotId });
  }

  public async deleteDepot(depotId: number): Promise<void> {
    await this.depotRepository.delete(depotId);
  }

  private async getDepotCity(cityId: number): Promise<DepotCity> {
    const [depotCity] = <[DepotCity]> await this.depotRepository.query(
      `
      SELECT city."cityId", city."name", 
        JSON_BUILD_OBJECT(
          'countryId', c."countryId", 
          'name', c."name"
        ) AS "country"
      FROM ${TableName.CITY}
        INNER JOIN ${TableName.COUNTRY} AS c ON c."countryId" = city."countryId"
        WHERE city."cityId" = $1 AND c."countryId" = city."countryId"
    `,
      [cityId],
    );

    if (!depotCity) {
      throw new BadRequestException('Такого города не существует');
    }

    return depotCity;
  }
}
