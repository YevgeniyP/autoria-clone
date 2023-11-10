import { UserEntity } from '../app-repository/entities/user.entity';
import { BaseUserAccountDto } from './dto/response/base-user-account.dto';
import { BaseUserAccountWithTokenDto } from './dto/response/base-user-account-with-token.dto';
import { FullUserAccountDto } from './dto/response/full-user-account.dto';

export class AuthResponseMapper {
  static toBaseResponse(user: UserEntity): BaseUserAccountDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      isBanned: user.isBanned,
    };
  }

  static toBaseResponseWithToken(
    user: UserEntity,
    token: string,
  ): BaseUserAccountWithTokenDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      isBanned: user.isBanned,
      token,
    };
  }

  static toGetCurrentUser(user: UserEntity): FullUserAccountDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      isBanned: user.isBanned,
      name: user.profile.name,
      surname: user.profile.surname,
      phone: user.profile.phone,
      image: user.profile.image,
    };
  }
}
