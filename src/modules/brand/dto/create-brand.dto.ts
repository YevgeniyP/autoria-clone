import { PickType } from '@nestjs/swagger';

import { BrandDto } from './brand.dto';

export class CreateBrandDto extends PickType(BrandDto, ['title']) {}
