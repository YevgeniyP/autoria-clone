import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { RoleEnum } from '../../enum/role.enum';

export class AccountListQueryDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly offset: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit: number = 10;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  readonly search?: string;

  @IsOptional()
  @IsEnum(RoleEnum)
  readonly role?: RoleEnum;

  @Type(() => Boolean)
  @IsOptional()
  readonly isBanned?: boolean;
}
