import { PickType } from '@nestjs/swagger';

import { ModelDto } from './model.dto';

export class CreateModelDto extends PickType(ModelDto, ['title']) {}
