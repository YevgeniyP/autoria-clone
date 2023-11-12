import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class ModelDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  readonly title: string;
}
