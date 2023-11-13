import { IList } from '../types/list.interface';
import { PaginationResponseDto } from './pagination-response.dto';
import { QueryInterface } from './query.interface';

export class PaginationResponseMapper {
  static toPaginationResponse<T>(
    data: IList<T>,
    query: QueryInterface,
  ): PaginationResponseDto<T> {
    return {
      data: data.entities,
      currentPage: query.offset,
      totalPages: Math.ceil(data.total / query.limit),
      totalItems: data.total,
    };
  }
}
