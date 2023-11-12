import { Module } from '@nestjs/common';

import { BrandController } from './controllers/brand.controller';
import { ModelController } from './controllers/model.controller';
import { BrandService } from './services/brand.service';
import { ModelService } from './services/model.service';

@Module({
  imports: [],
  controllers: [BrandController, ModelController],
  providers: [BrandService, ModelService],
})
export class NomenclatureModule {}
