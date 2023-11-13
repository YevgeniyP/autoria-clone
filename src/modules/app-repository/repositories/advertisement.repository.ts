import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IList } from '../../../common/types/list.interface';
import { AdvertisementQueryDto } from '../../advertisement/dto/advertisement-query.dto';
import { AdvertisementEntity } from '../entities/advertisement.entity';

@Injectable()
export class AdvertisementRepository extends Repository<AdvertisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertisementEntity, dataSource.manager);
  }

  public async findWithQuery(
    query: AdvertisementQueryDto,
  ): Promise<IList<AdvertisementEntity>> {
    const queryBuilder = this.createQueryBuilder('advertisement');

    if (query.brand) {
      queryBuilder.andWhere('advertisement.brand = :brand', {
        brand: query.brand,
      });
    }

    if (query.model) {
      queryBuilder.andWhere('advertisement.model = :model', {
        model: query.model,
      });
    }

    if (query.city) {
      queryBuilder.andWhere('LOWER (advertisement.city) = :city', {
        city: query.city,
      });
    }

    if (query.status) {
      queryBuilder.andWhere('advertisement.status = :status', {
        status: query.status,
      });
    }

    queryBuilder.limit(query.limit);
    queryBuilder.offset((query.offset - 1) * query.limit);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return { entities, total };
  }
}
