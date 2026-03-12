import { IsArray, IsInt, IsObject, IsOptional } from 'class-validator';

export class PaginateResultDto<T> {
  @IsOptional()
  @IsObject()
  next?: { page: number; limit: number };

  @IsOptional()
  @IsObject()
  previous?: { page: number; limit: number };

  @IsArray()
  results: T[];

  @IsInt()
  totalPages: number;

  /*
  constructor(partial: Partial<PaginateResultDto<T>>) {
    Object.assign(this, partial);
  }
  */
}
