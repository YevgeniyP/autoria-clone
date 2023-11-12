import { Injectable } from '@nestjs/common';

import { ModelEntity } from '../../app-repository/entities/model.entity';
import { ModelRepository } from '../../app-repository/repositories/model.repository';
import { ModelDto } from '../dto/request/model.dto';

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: ModelRepository) {}

  public async findAll(id: string): Promise<ModelEntity[]> {
    return await this.modelRepository.find({
      where: { brand: { id } },
    });
  }

  public async create(id: string, dto: ModelDto): Promise<ModelEntity> {
    return await this.modelRepository.createByBrandId(id, dto);
  }

  public async updateById(id: string, dto: ModelDto): Promise<ModelEntity> {
    return await this.modelRepository.updateById(id, dto);
  }

  public async deleteById(id: string): Promise<void> {
    await this.modelRepository.deleteById(id);
  }
}
