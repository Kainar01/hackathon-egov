import type { BaseEntity } from '@/common/entities/base.entity';

export interface Country extends BaseEntity {
  countryId: number;
  name: string;
  code: string;
  slug: string;
  order: number | null;
}
