import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 1 })
  totalPages: number;

  @ApiProperty({ example: 1 })
  totalItems: number;
}
