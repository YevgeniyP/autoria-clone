import { ApiProperty } from '@nestjs/swagger';

import { BaseUserAccountDto } from './base-user-account.dto';

export class FullUserAccountDto extends BaseUserAccountDto {
  @ApiProperty({ example: 'Kokos' })
  readonly name: string;

  @ApiProperty({ example: 'Kokosenko' })
  readonly surname: string;

  @ApiProperty({ example: '+380999999999' })
  readonly phone: string;

  @ApiProperty({ example: '' })
  readonly image: string;
}
