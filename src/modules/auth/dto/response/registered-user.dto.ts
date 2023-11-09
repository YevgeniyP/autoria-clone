import { ApiProperty } from '@nestjs/swagger';

import { AccountTypeEnum } from '../../enum/account-type.enum';
import { RoleEnum } from '../../enum/role.enum';

export class RegisteredUserDto {
  @ApiProperty({ example: '6d488e60-5734-48fe-93a3-772adf53ed70' })
  id: string;

  @ApiProperty({ example: 'Kokos123' })
  username: string;

  @ApiProperty({ example: 'kokos123@mail.com' })
  email: string;

  @ApiProperty({
    example: RoleEnum.SELLER,
    enum: RoleEnum,
    default: RoleEnum.SELLER,
  })
  role: RoleEnum;

  @ApiProperty({
    example: AccountTypeEnum.BASIC,
    enum: AccountTypeEnum,
    default: AccountTypeEnum.BASIC,
  })
  accountType: AccountTypeEnum;
}
