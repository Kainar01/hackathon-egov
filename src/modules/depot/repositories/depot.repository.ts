import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TableName } from '@/common/enums/table';

import type { DepotResponseDto } from '../dto/depot.response.dto';
import type { GetDepotsQueryDto } from '../dto/get-depots.query.dto';
import { DepotEntity } from '../entities/depot.entity';

@Injectable()
export class DepotRepository extends Repository<DepotEntity> {
  constructor(dataSource: DataSource) {
    super(DepotEntity, dataSource.createEntityManager());
  }

  public async findDepots({ limit, search, offset }: GetDepotsQueryDto): Promise<DepotResponseDto[]> {
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

    return <DepotResponseDto[]> await this.query(query, params);
  }
}
