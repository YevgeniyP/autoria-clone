import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IList } from '../../../common/types/list.interface';
import { AccountListQueryDto } from '../../auth/dto/request/account-list-query.dto';
import { RegisterUserDto } from '../../auth/dto/request/register-user.dto';
import { PasswordService } from '../../auth/services/password.service';
import { ProfileEntity } from '../entities/profile.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    private dataSource: DataSource,
    private readonly passwordService: PasswordService,
  ) {
    super(UserEntity, dataSource.manager);
  }

  public async createUserWithProfile(
    dto: RegisterUserDto,
  ): Promise<UserEntity> {
    return await this.manager.transaction(async (entityManager) => {
      const userRepository = entityManager.getRepository(UserEntity);
      const profileRepository = entityManager.getRepository(ProfileEntity);

      const findUserByEmail = await userRepository.findOneBy({
        email: dto.email,
      });
      if (findUserByEmail) {
        throw new BadRequestException('Email already exist');
      }
      const findUserByUsername = await userRepository.findOneBy({
        username: dto.username,
      });
      if (findUserByUsername) {
        throw new BadRequestException('Username already exist');
      }
      const user = userRepository.create(dto);
      user.password = await this.passwordService.hashPassword(dto.password);
      await userRepository.save(user);
      await profileRepository.save(profileRepository.create({ user }));
      return await userRepository.findOne({
        where: { id: user.id },
        relations: { profile: true },
      });
    });
  }

  public async findWithQuery(
    query: AccountListQueryDto,
  ): Promise<IList<UserEntity>> {
    const queryBuilder = this.createQueryBuilder('account');

    if (query.search) {
      queryBuilder.andWhere(
        'LOWER (account.username) LIKE :search OR LOWER (account.email) LIKE :search',
        { search: `%${query.search.toLowerCase()}%` },
      );
    }

    if (query.isBanned) {
      queryBuilder.andWhere('account.isBanned = :isBanned', {
        isBanned: query.isBanned,
      });
    }

    if (query.role) {
      queryBuilder.andWhere('account.role = :role', { role: query.role });
    }

    queryBuilder.limit(query.limit);
    queryBuilder.offset((query.offset - 1) * query.limit);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return { entities, total };
  }
}
