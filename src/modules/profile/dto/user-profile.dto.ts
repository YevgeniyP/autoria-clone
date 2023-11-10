import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UserProfileDto {
  @ApiProperty({ example: '' })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  readonly name?: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  readonly surname?: string;

  @ApiProperty({ example: '+380999999999' })
  @IsOptional()
  @IsString()
  @Matches(/^\+38(067|068|097|098|099|050)\d{7}$/gms)
  readonly phone?: string;

  @ApiProperty()
  @IsString()
  readonly image: string;
}
