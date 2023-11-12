import { ApiProperty } from '@nestjs/swagger';

import { BaseUserAccountDto } from './base-user-account.dto';

export class BaseUserListResponseDto {
  @ApiProperty({ isArray: true, type: BaseUserAccountDto })
  readonly data: BaseUserAccountDto[];

  @ApiProperty({ example: 1 })
  readonly currentPage: number;

  @ApiProperty({ example: 1 })
  readonly totalPages: number;

  @ApiProperty({ example: 1 })
  readonly totalItems: number;
}
