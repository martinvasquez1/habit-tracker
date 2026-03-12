import { ObjectLiteral } from 'typeorm';
import { PaginateOptionsDto } from './dto/paginate-options.dto';
import { PaginateResultDto } from './dto/paginate-result.dto';

export default async function paginate<T extends ObjectLiteral>(
  items: T[],
  totalCount: number,
  options: PaginateOptionsDto<T> = {},
): Promise<PaginateResultDto<T>> {
  const { page = 1, limit = 10 } = options;

  const results: PaginateResultDto<T> = {
    results: [],
    totalPages: 0,
  };

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  results.results = items;
  results.totalPages = Math.ceil(totalCount / limit);

  if (endIndex < totalCount) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  return results;
}
