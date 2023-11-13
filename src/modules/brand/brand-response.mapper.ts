import { BrandEntity } from '../app-repository/entities/brand.entity';
import { BrandDto } from './dto/brand.dto';

export class BrandResponseMapper {
  public static toBrandItem(brand: BrandEntity): BrandDto {
    return {
      id: brand.id,
      title: brand.title,
    };
  }

  public static toBrandList(brands: BrandEntity[]): BrandDto[] {
    return brands.map((brand) => this.toBrandItem(brand));
  }
}
