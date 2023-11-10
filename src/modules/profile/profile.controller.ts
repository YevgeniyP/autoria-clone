import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { ProfileService } from './profile.service';
import { ProfileResponseMapper } from './profile-response.mapper';

@ApiTags('Profile')
@UseGuards(JwtGuard, RoleGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @ApiBearerAuth()
  @Patch('/update')
  public async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<UserProfileDto> {
    const profile = await this.profileService.updateProfile(userId, dto);
    return ProfileResponseMapper.toProfile(profile);
  }
}
