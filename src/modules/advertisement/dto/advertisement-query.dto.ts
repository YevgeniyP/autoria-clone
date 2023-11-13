import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import { StatusEnum } from '../enum/status.enum';

export class AdvertisementQueryDto {
  @ApiPropertyOptional({ description: 'Brand id' })
  @IsOptional()
  @IsUUID()
  readonly brand?: string;

  @ApiPropertyOptional({ description: 'Model id' })
  @IsOptional()
  @IsUUID()
  readonly model?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  readonly city?: string;

  @ApiPropertyOptional({ default: StatusEnum.PUBLISHED })
  @IsEnum(StatusEnum)
  readonly status: StatusEnum = StatusEnum.PUBLISHED;

  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly limit: number = 10;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly offset: number = 1;
}
