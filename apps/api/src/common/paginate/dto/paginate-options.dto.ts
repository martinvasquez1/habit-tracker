import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateOptionsDto<T> {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  filter?: Partial<T>;
}
