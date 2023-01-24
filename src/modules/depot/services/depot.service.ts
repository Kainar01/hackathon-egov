import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TableName } from '@/common/enums/table';

import type { DepotResponseDto } from '../dto/depot.response.dto';
import type { GetDepotsQueryDto } from '../dto/get-depots.query.dto';
import { DepotEntity } from '../entities/depot.entity';

@Injectable()
export class DepotService {
  constructor(@InjectRepository(DepotEntity) private depotRepository: Repository<DepotEntity>) {}

  public async getDepots({ offset, limit, search }: GetDepotsQueryDto): Promise<DepotResponseDto[]> {
    let query = `
      SELECT d."depotId", d."buyerFee", d."name", d."lat", d."lng", d."allowOrder", 
          JSON_BUILD_OBJECT('countryId', c."countryId", 'name', c.name) as "country", 
          JSON_BUILD_OBJECT(
            'addressId', a."addressId", 
            'address', a."address",
            'zip', a."zip",
            'phone', a."phone",
            'cityId', city."cityId", 
            'name', city."name"
          ) AS "address"
        FROM ${TableName.DEPOT} AS d 
          INNER JOIN ${TableName.COUNTRY} AS c ON c."countryId" = d."countryId"
          INNER JOIN ${TableName.ADDRESS} AS a ON a."addressId" = d."addressId"
          INNER JOIN ${TableName.CITY} ON city."cityId" = a."cityId"
    `;
    const params: (number | string)[] = [limit, offset];

    if (search) {
      query += ' WHERE (c.name ILIKE $3 OR d.name ILIKE $3 OR c.name ILIKE $3)';

      const likeString = `${search}%`;

      params.push(likeString);
    }

    query += `
      GROUP BY d."depotId", c."countryId", a."addressId", city."cityId", city."name" 
      LIMIT $1 OFFSET $2
    `;

    return <DepotResponseDto[]> await this.depotRepository.query(query, params);
  }
}
