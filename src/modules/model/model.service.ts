import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BrandEntity } from '../app-repository/entities/brand.entity';
import { ModelEntity } from '../app-repository/entities/model.entity';
import { ModelRepository } from '../app-repository/repositories/model.repository';
import { CreateModelDto } from './dto/create-model.dto';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelRepository: ModelRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async findAll(id: string): Promise<ModelEntity[]> {
    return await this.modelRepository.find({
      where: { brand: { id } },
    });
  }

  public async create(id: string, dto: CreateModelDto): Promise<ModelEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const brandRepository = manager.getRepository(BrandEntity);
      const modelRepository = manager.getRepository(ModelEntity);

      const brand = await brandRepository.findOneBy({ id });
      if (!brand) {
        throw new BadRequestException('Brand not found');
      }

      const checkModel = await modelRepository.findOneBy({ title: dto.title });
      if (checkModel) {
        throw new BadRequestException('Model already exist');
      }
      const model = modelRepository.create({ ...dto, brand });
      return await modelRepository.save(model);
    });
  }

  public async updateById(
    id: string,
    dto: CreateModelDto,
  ): Promise<ModelEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const modelRepository = manager.getRepository(ModelEntity);

      const model = await modelRepository.findOneBy({ id });
      if (!model) {
        throw new BadRequestException('Model not found');
      }
      modelRepository.merge(model, dto);
      return await modelRepository.save(model);
    });
  }
}
