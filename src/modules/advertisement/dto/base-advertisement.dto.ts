import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

import { CurrencyEnum } from '../enum/currency.enum';
import { StatusEnum } from '../enum/status.enum';

export class BaseAdvertisementDto {
  @ApiProperty({ example: 'uuid', readOnly: true })
  readonly id: string;

  @ApiProperty({})
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(5, 255)
  readonly title: string;

  @ApiProperty({})
  @IsString()
  readonly description: string;

  @ApiProperty({})
  @IsUUID()
  readonly user: string;

  @ApiProperty({})
  @IsUUID()
  readonly brand: string;

  @ApiProperty({})
  @IsUUID()
  readonly model: string;

  @ApiProperty({ example: 2010 })
  @IsNumber()
  @Min(1990)
  @Max(new Date().getFullYear())
  readonly year: number;

  @ApiProperty({ example: 20000 })
  @IsNumber()
  @Min(0)
  readonly price: number;

  @ApiProperty({ example: CurrencyEnum.UAH })
  @IsEnum(CurrencyEnum)
  readonly currency: CurrencyEnum;

  @ApiProperty({})
  @Transform(({ value }) => value.trim())
  @IsString()
  readonly city: string;

  @ApiProperty({ example: StatusEnum.DRAFT })
  @IsEnum(StatusEnum)
  readonly status: StatusEnum;

  @ApiProperty({ example: 10 })
  readonly views: number;

  @ApiProperty({ example: '2020-10-10T00:00:00.000Z', readOnly: true })
  readonly createdAt: Date;
}
