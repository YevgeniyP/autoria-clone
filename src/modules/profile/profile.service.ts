import { Injectable } from '@nestjs/common';

import { ProfileEntity } from '../app-repository/entities/profile.entity';
import { ProfileRepository } from '../app-repository/repositories/profile.repository';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  public async updateProfile(
    userId: string,
    dto: UpdateUserProfileDto,
  ): Promise<ProfileEntity> {
    const userProfile = await this.profileRepository.findOneBy({
      user: { id: userId },
    });
    this.profileRepository.merge(userProfile, dto);
    return await this.profileRepository.save(userProfile);
  }
}
