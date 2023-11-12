import { ApiProperty } from '@nestjs/swagger';

export class ModelResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Kuga' })
  title: string;
}
