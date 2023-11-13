import { AdvertisementEntity } from '../app-repository/entities/advertisement.entity';
import { AuthResponseMapper } from '../auth/auth-response.mapper';
import { AdvertisementResponseDto } from './dto/advertisement-response.dto';

export class AdvertisementResponseMapper {
  static toFullAdvertisementResponse(
    advertisement: AdvertisementEntity,
  ): AdvertisementResponseDto {
    return {
      id: advertisement.id,
      title: advertisement.title,
      description: advertisement.description,
      brand: advertisement.brand.title,
      model: advertisement.model.title,
      year: advertisement.year,
      price: advertisement.price,
      currency: advertisement.currency,
      city: advertisement.city,
      status: advertisement.status,
      views: advertisement.views,
      user: AuthResponseMapper.toGetCurrentUser(advertisement.user),
      createdAt: advertisement.createdAt,
    };
  }
}
