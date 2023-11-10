import { ProfileEntity } from '../app-repository/entities/profile.entity';
import { UserProfileDto } from './dto/user-profile.dto';

export class ProfileResponseMapper {
  static toProfile(profile: ProfileEntity): UserProfileDto {
    const { name, surname, phone, image } = profile;
    return {
      name,
      surname,
      phone,
      image,
    };
  }
}
