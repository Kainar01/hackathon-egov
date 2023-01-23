import type { BaseEntity } from '@/common/entities/base.entity';

export interface City extends BaseEntity {
  cityId: number;
  countryId: number;
  name: string;
  slug: string;
  order: number | null;
}
