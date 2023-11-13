import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { IList } from '../../common/types/list.interface';
import { AdvertisementEntity } from '../app-repository/entities/advertisement.entity';
import { BrandEntity } from '../app-repository/entities/brand.entity';
import { ModelEntity } from '../app-repository/entities/model.entity';
import { UserEntity } from '../app-repository/entities/user.entity';
import { AdvertisementRepository } from '../app-repository/repositories/advertisement.repository';
import { UserRepository } from '../app-repository/repositories/user.repository';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';
import { AdvertisementQueryDto } from './dto/advertisement-query.dto';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { StatusEnum } from './enum/status.enum';

@Injectable()
export class AdvertisementService {
  constructor(
    private readonly advertisementRepository: AdvertisementRepository,
    private readonly currencyExchangeService: CurrencyExchangeService,
    private readonly userRepository: UserRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async findAll(
    query: AdvertisementQueryDto,
  ): Promise<IList<AdvertisementEntity>> {
    return await this.advertisementRepository.findWithQuery(query);
  }

  public async findById(id: string): Promise<AdvertisementEntity> {
    const advertisement = await this.advertisementRepository.findOne({
      where: { id },
      relations: { user: { profile: true }, brand: true, model: true },
      transaction: true,
    });
    if (!advertisement) {
      throw new BadRequestException('Advertisement not found');
    }
    return advertisement;
  }

  public async createAdvertisement(
    id: string,
    dto: CreateAdvertisementDto,
  ): Promise<AdvertisementEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const advertisementRepository =
        manager.getRepository(AdvertisementEntity);
      const userRepository = manager.getRepository(UserEntity);
      const brandRepository = manager.getRepository(BrandEntity);
      const modelRepository = manager.getRepository(ModelEntity);

      const user = await userRepository.findOneBy({ id });
      const brand = await brandRepository.findOneBy({ id: dto.brand });
      if (!brand) {
        throw new BadRequestException('Brand not found');
      }
      const model = await modelRepository.findOneBy({ id: dto.model });
      if (!model) {
        throw new BadRequestException('Model not found');
      }

      const advertisement = advertisementRepository.create({
        ...dto,
        user,
        brand,
        model,
      });

      return await advertisementRepository.save(advertisement);
    });
  }

  public async toDraftById(id: string): Promise<AdvertisementEntity> {
    const advertisement = await this.findById(id);
    advertisement.status = StatusEnum.DRAFT;
    return await this.advertisementRepository.save(advertisement);
  }

  public async toPublishedById(id: string): Promise<AdvertisementEntity> {
    const advertisement = await this.findById(id);
    advertisement.status = StatusEnum.PUBLISHED;
    return await this.advertisementRepository.save(advertisement);
  }

  public async toArchivedById(id: string): Promise<AdvertisementEntity> {
    const advertisement = await this.findById(id);
    advertisement.status = StatusEnum.ARCHIVED;
    return await this.advertisementRepository.save(advertisement);
  }
}
