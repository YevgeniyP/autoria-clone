import { ApiProperty } from '@nestjs/swagger';

import { AccountTypeEnum } from '../../enum/account-type.enum';
import { RoleEnum } from '../../enum/role.enum';

export class BaseUserAccountDto {
  @ApiProperty({ example: '6d488e60-5734-48fe-93a3-772adf53ed70' })
  readonly id: string;

  @ApiProperty({ example: 'Kokos123' })
  readonly username: string;

  @ApiProperty({ example: 'kokos123@mail.com' })
  readonly email: string;

  @ApiProperty({
    example: RoleEnum.SELLER,
    enum: RoleEnum,
    default: RoleEnum.SELLER,
  })
  readonly role: RoleEnum;

  @ApiProperty({
    example: AccountTypeEnum.BASIC,
    enum: AccountTypeEnum,
    default: AccountTypeEnum.BASIC,
  })
  readonly accountType: AccountTypeEnum;

  @ApiProperty({ example: false })
  readonly isBanned: boolean;
}
