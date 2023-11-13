import { PickType } from '@nestjs/swagger';

import { BaseAdvertisementDto } from './base-advertisement.dto';

export class CreateAdvertisementDto extends PickType(BaseAdvertisementDto, [
  'title',
  'description',
  'brand',
  'model',
  'year',
  'price',
  'currency',
  'city',
]) {}
