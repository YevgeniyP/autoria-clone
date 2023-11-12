import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandDto } from '../../nomenclature/dto/request/brand.dto';
import { BrandEntity } from '../entities/brand.entity';

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BrandEntity, dataSource.manager);
  }

  public async createOrFail(dto: BrandDto): Promise<BrandEntity> {
    return await this.manager.transaction(async (entityManager) => {
      const brandRepository = entityManager.getRepository(BrandEntity);

      if (await this.checkUniqueTitle(dto.title)) {
        throw new BadRequestException('Brand already exist');
      }
      const brand = brandRepository.create(dto);
      return await brandRepository.save(brand);
    });
  }

  public async updateOrFail(id: string, dto: BrandDto): Promise<BrandEntity> {
    return await this.manager.transaction(async (entityManager) => {
      const brandRepository = entityManager.getRepository(BrandEntity);

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

  public deleteById(id: string): Promise<void> {
    return this.manager.transaction(async (entityManager) => {
      const brandRepository = entityManager.getRepository(BrandEntity);
      const brand = await brandRepository.findOneBy({ id });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
      await brandRepository.remove(brand);
    });
  }

  private async checkUniqueTitle(title: string): Promise<boolean> {
    const brand = await this.findOneBy({ title });
    if (brand) {
      return true;
    }
    return false;
  }
}
