import { PaginationQueryDto } from '@/common/dto/pagination.query.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetDepotsQueryDto extends PaginationQueryDto{
  @IsString()
  @IsOptional()
  search?: string;
}

