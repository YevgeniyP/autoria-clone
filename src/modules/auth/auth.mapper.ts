import { UserEntity } from '../app-repository/entities/user.entity';
import { LoginedUserDto } from './dto/response/logined-user.dto';
import { RegisteredUserDto } from './dto/response/registered-user.dto';

export class AuthMapper {
  static toRegisterResponse(user: UserEntity): RegisteredUserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
    };
  }

  static toLoginResponse(user: UserEntity, token: string): LoginedUserDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      token,
    };
  }

  static toGetCurrentUser(user: UserEntity) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      isBanned: user.isBanned,
      // name: user.profile.name,
      // surname: user.profile.surname,
      // phone: user.profile.phone,
      // image: user.profile.image,
    };
  }
}
