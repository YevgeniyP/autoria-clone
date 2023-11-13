import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BrandEntity } from '../app-repository/entities/brand.entity';
import { BrandRepository } from '../app-repository/repositories/brand.repository';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    private readonly brandRepository: BrandRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async findAll(): Promise<BrandEntity[]> {
    return await this.brandRepository.find();
  }

  public async create(dto: CreateBrandDto): Promise<BrandEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const brandRepository = manager.getRepository(BrandEntity);

      if (await this.checkUniqueTitle(dto.title)) {
        throw new BadRequestException('Brand already exist');
      }
      const brand = brandRepository.create(dto);
      return await brandRepository.save(brand);
    });
  }

  public async updateById(
    id: string,
    dto: CreateBrandDto,
  ): Promise<BrandEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const brandRepository = manager.getRepository(BrandEntity);

      if (await this.checkUniqueTitle(dto.title)) {
        throw new BadRequestException('Brand already exist');
      }
      const brand = await brandRepository.findOneBy({ id });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
      brandRepository.merge(brand, dto);
      return await brandRepository.save(brand);
    });
  }

  private async checkUniqueTitle(title: string): Promise<boolean> {
    const brand = await this.brandRepository.findOneBy({ title });
    return !!brand;
  }
}
