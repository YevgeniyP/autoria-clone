import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '../../modules/auth/enum/role.enum';

export const ROLE_KEY = 'role';
export const Role = (...role: RoleEnum[]) => SetMetadata(ROLE_KEY, role);
