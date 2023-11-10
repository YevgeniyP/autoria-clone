import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { RoleEnum } from '../../enum/role.enum';

export class AccountListQueryDto {
  @IsOptional()
  readonly limit?: number;

  @IsOptional()
  readonly offset?: number;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  readonly search?: string;

  @IsOptional()
  readonly role?: RoleEnum;

  @IsOptional()
  readonly isBanned?: boolean;
}
