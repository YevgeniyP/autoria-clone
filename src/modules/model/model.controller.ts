import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Role } from '../../common/decorators/role.decorator';
import { RoleEnum } from '../auth/enum/role.enum';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { CreateModelDto } from './dto/create-model.dto';
import { ModelDto } from './dto/model.dto';
import { ModelService } from './model.service';
import { ModelResponseMapper } from './model-response.mapper';

@ApiTags('Models')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Role(RoleEnum.SELLER, RoleEnum.MANAGER, RoleEnum.ADMIN)
@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @ApiOperation({ summary: 'Get all models by brand id' })
  @Get(':id')
  public async findAllByBrandId(@Param('id') id: string): Promise<ModelDto[]> {
    const models = await this.modelService.findAll(id);
    return ModelResponseMapper.toModelList(models);
  }

  @ApiOperation({ summary: 'Create new model by brand id' })
  @Post(':id')
  public async create(
    @Param('id') id: string,
    @Body() dto: CreateModelDto,
  ): Promise<ModelDto> {
    const model = await this.modelService.create(id, dto);
    return ModelResponseMapper.toModelItem(model);
  }

  @ApiOperation({ summary: 'Update model by id' })
  @Patch(':id')
  public async updateById(
    @Param('id') id: string,
    @Body() dto: CreateModelDto,
  ): Promise<ModelDto> {
    const model = await this.modelService.updateById(id, dto);
    return ModelResponseMapper.toModelItem(model);
  }
}
