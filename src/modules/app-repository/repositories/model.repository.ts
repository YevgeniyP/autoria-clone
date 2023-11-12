import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ModelDto } from '../../nomenclature/dto/request/model.dto';
import { BrandEntity } from '../entities/brand.entity';
import { ModelEntity } from '../entities/model.entity';

@Injectable()
export class ModelRepository extends Repository<ModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ModelEntity, dataSource.manager);
  }

  public async createByBrandId(
    id: string,
    dto: ModelDto,
  ): Promise<ModelEntity> {
    return await this.manager.transaction(async (entityManager) => {
      const brandRepository = entityManager.getRepository(BrandEntity);
      const modelRepository = entityManager.getRepository(ModelEntity);

      const brand = await brandRepository.findOneBy({ id });
      if (!brand) {
        throw new BadRequestException('Brand not found');
      }

      const checkModel = await modelRepository.findOneBy({ title: dto.title });
      if (checkModel) {
        throw new BadRequestException('Model already exist');
      }
      const model = modelRepository.create({ brand, ...dto });
      return await modelRepository.save(model);
    });
  }

  public async updateById(id: string, dto: ModelDto): Promise<ModelEntity> {
    return await this.manager.transaction(async (entityManager) => {
      const modelRepository = entityManager.getRepository(ModelEntity);

      const model = await modelRepository.findOneBy({ id });
      if (!model) {
        throw new BadRequestException('Model not found');
      }
      modelRepository.merge(model, dto);
      return await modelRepository.save(model);
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.manager.transaction(async (entityManager) => {
      const modelRepository = entityManager.getRepository(ModelEntity);

      const model = await modelRepository.findOneBy({ id });
      if (!model) {
        throw new BadRequestException('Model not found');
      }
      await modelRepository.remove(model);
    });
  }
}
