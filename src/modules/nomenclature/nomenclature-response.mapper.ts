import { BrandEntity } from '../app-repository/entities/brand.entity';
import { ModelEntity } from '../app-repository/entities/model.entity';
import { BrandResponseDto } from './dto/response/brand-response.dto';
import { ModelResponseDto } from './dto/response/model-response.dto';

export class NomenclatureResponseMapper {
  static toBrandItem(brand: BrandEntity): BrandResponseDto {
    return {
      id: brand.id,
      title: brand.title,
    };
  }

  static toBrandList(brands: BrandEntity[]): BrandResponseDto[] {
    return brands.map((brand) => NomenclatureResponseMapper.toBrandItem(brand));
  }

  static toModelItem(model: ModelEntity): ModelResponseDto {
    return {
      id: model.id,
      title: model.title,
    };
  }

  static toModelList(models: ModelEntity[]): ModelResponseDto[] {
    return models.map((model) => NomenclatureResponseMapper.toModelItem(model));
  }
}
