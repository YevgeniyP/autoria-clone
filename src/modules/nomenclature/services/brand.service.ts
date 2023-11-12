import { Injectable } from '@nestjs/common';

import { BrandEntity } from '../../app-repository/entities/brand.entity';
import { BrandRepository } from '../../app-repository/repositories/brand.repository';
import { BrandDto } from '../dto/request/brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  public async findAll(): Promise<BrandEntity[]> {
    return await this.brandRepository.find();
  }

  public async create(dto: BrandDto): Promise<BrandEntity> {
    return await this.brandRepository.createOrFail(dto);
  }

  public async updateBuId(id: string, dto: BrandDto): Promise<BrandEntity> {
    return await this.brandRepository.updateOrFail(id, dto);
  }

  public async deleteById(id: string): Promise<void> {
    await this.brandRepository.deleteById(id);
  }
}
