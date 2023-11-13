import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IList } from '../../../common/types/list.interface';
import { AccountListQueryDto } from '../../auth/dto/request/account-list-query.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
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
