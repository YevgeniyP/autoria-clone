import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class BrandDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  readonly id: string;

  @ApiProperty({ example: 'Ford', description: 'Brand title' })
  @Transform(({ value }) => value.trim())
  @IsString()
  readonly title: string;
}
