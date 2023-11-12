import { IList } from '../../common/types/list.interface';
import { UserEntity } from '../app-repository/entities/user.entity';
import { AccountListQueryDto } from './dto/request/account-list-query.dto';
import { BaseUserAccountDto } from './dto/response/base-user-account.dto';
import { BaseUserAccountWithTokenDto } from './dto/response/base-user-account-with-token.dto';
import { BaseUserListResponseDto } from './dto/response/base-user-list-response.dto';
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

  static toBaseResponseList(
    data: IList<UserEntity>,
    query: AccountListQueryDto,
  ): BaseUserListResponseDto {
    return {
      data: data.entities.map(this.toBaseResponse),
      currentPage: query.offset,
      totalPages: Math.ceil(data.total / query.limit),
      totalItems: data.total,
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
