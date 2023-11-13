import { ModelEntity } from '../app-repository/entities/model.entity';
import { ModelDto } from './dto/model.dto';

export class ModelResponseMapper {
  public static toModelItem(model: ModelEntity): ModelDto {
    return {
      id: model.id,
      title: model.title,
    };
  }

  public static toModelList(models: ModelEntity[]): ModelDto[] {
    return models.map((model) => this.toModelItem(model));
  }
}
