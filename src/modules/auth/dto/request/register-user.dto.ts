import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'Kokos123',
    minLength: 5,
    maxLength: 25,
    uniqueItems: true,
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @Length(5, 25)
  readonly username: string;

  @ApiProperty({
    description: 'User email',
    example: 'kokos123@mail.com',
    uniqueItems: true,
  })
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Kokos123',
    minLength: 5,
    maxLength: 15,
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
