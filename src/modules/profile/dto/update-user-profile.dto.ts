import { PickType } from '@nestjs/swagger';

import { UserProfileDto } from './user-profile.dto';

export class UpdateUserProfileDto extends PickType(UserProfileDto, [
  'name',
  'surname',
  'phone',
]) {}
