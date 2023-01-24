import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { TableName } from '@/common/enums/table';

import type { CreateDepotBodyDto } from '../dto/create-depot.body.dto';
import type { DepotResponseDto } from '../dto/depot.response.dto';
import type { GetDepotsQueryDto } from '../dto/get-depots.query.dto';
import { DepotEntity } from '../entities/depot.entity';
import type { DepotCity } from '../interfaces/depot.interface';

@Injectable()
export class DepotService {
  constructor(@InjectRepository(DepotEntity) private depotRepository: Repository<DepotEntity>) {}

  public async getDepots({ offset, limit, search }: GetDepotsQueryDto): Promise<DepotResponseDto[]> {
    let query = `
      SELECT d."depotId", d."buyerFee", d."name", d."lat", d."lng", 
          d."allowOrder", d."phone", d."zip", d."address",
          JSON_BUILD_OBJECT('countryId', c."countryId", 'name', c.name) as "country", 
          JSON_BUILD_OBJECT(
            'cityId', city."cityId", 
            'name', city."name"
          ) AS "city"
        FROM ${TableName.DEPOT} AS d 
          INNER JOIN ${TableName.COUNTRY} AS c ON c."countryId" = d."countryId"
          INNER JOIN ${TableName.CITY} ON city."cityId" = d."cityId"
    `;
    const params: (number | string)[] = [limit, offset];

    if (search) {
      query += ' WHERE (c.name ILIKE $3 OR d.name ILIKE $3 OR c.name ILIKE $3)';

      const likeString = `${search}%`;

      params.push(likeString);
    }

    query += `
      GROUP BY d."depotId", c."countryId", city."cityId"
      LIMIT $1 OFFSET $2
    `;

    return <DepotResponseDto[]> await this.depotRepository.query(query, params);
  }

  public async createDepot(data: CreateDepotBodyDto): Promise<DepotResponseDto> {
    // TODO: validate lat lng are in city location
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
      [data.cityId],
    );

    if (!depotCity) {
      throw new BadRequestException('Не правильно введен страна или город');
    }

    const { country, ...city } = depotCity;

    const depot = await this.depotRepository.save({ ...data, countryId: country.countryId });

    return {
      ..._.pick(depot, [
        'depotId',
        'name',
        'address',
        'phone',
        'zip',
        'lat',
        'lng',
        'buyerFee',
        'allowOrder',
      ]),
      city,
      country,
    };
  }
}
