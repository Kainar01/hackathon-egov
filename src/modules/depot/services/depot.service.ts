import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TableName } from '@/common/enums/table';

import type { GetDepotsQueryDto } from '../dto/get-depots.query.dto';
import type { GetDepotsResponseDto } from '../dto/get-depots.response.dto';
import { DepotEntity } from '../entities/depot.entity';

@Injectable()
export class DepotService {
  constructor(@InjectRepository(DepotEntity) private depotRepository: Repository<DepotEntity>) {}

  public async getDepots({ offset, limit, search }: GetDepotsQueryDto): Promise<GetDepotsResponseDto> {
    let query = `
      SELECT * FROM ${TableName.DEPOT} AS d 
        INNER JOIN ${TableName.COUNTRY} AS c ON c."countryId" = d."countryId"
        INNER JOIN ${TableName.ADDRESS} AS a ON a."addressId" = d."addressId"
    `;
    const params: (number | string)[] = [limit, offset];

    if (search) {
      query += ' WHERE c.name ILIKE $3 OR d.name ILIKE $3';

      const likeString = `${search}%`;

      params.push(likeString);
    }

    query += ' LIMIT $1 OFFSET $2';

    return <GetDepotsResponseDto> await this.depotRepository.query(query, params);
  }
}
