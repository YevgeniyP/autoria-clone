import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class BrandDto {
  @ApiProperty({ example: 'Ford', description: 'Brand title' })
  @Transform(({ value }) => value.trim())
  @IsString()
  title: string;
}
