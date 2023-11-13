import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class ModelDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  readonly id: string;

  @ApiProperty({ example: 'Kuga' })
  @Transform(({ value }) => value.trim())
  @IsString()
  readonly title: string;
}
