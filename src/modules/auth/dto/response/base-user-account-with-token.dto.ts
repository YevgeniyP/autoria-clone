import { BaseUserAccountDto } from './base-user-account.dto';

export class BaseUserAccountWithTokenDto extends BaseUserAccountDto {
  token: string;
}
