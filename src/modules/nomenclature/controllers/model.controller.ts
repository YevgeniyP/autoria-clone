import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Role } from '../../../common/decorators/role.decorator';
import { RoleEnum } from '../../auth/enum/role.enum';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { ModelDto } from '../dto/request/model.dto';
import { ModelResponseDto } from '../dto/response/model-response.dto';
import { NomenclatureResponseMapper } from '../nomenclature-response.mapper';
import { ModelService } from '../services/model.service';

@ApiTags('Models')
@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @ApiOperation({ summary: 'Get all models by brand id' })
  @Get(':id')
  public async findAllByBrandId(
    @Param('id') id: string,
  ): Promise<ModelResponseDto[]> {
    const models = await this.modelService.findAll(id);
    return NomenclatureResponseMapper.toModelList(models);
  }

  @ApiOperation({ summary: 'Create new model by brand id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @Post(':id')
  public async create(
    @Param('id') id: string,
    @Body() dto: ModelDto,
  ): Promise<ModelResponseDto> {
    const model = await this.modelService.create(id, dto);
    return NomenclatureResponseMapper.toModelItem(model);
  }

  @ApiOperation({ summary: 'Update model by id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @Patch(':id')
  public async updateById(
    @Param('id') id: string,
    @Body() dto: ModelDto,
  ): Promise<ModelResponseDto> {
    const model = await this.modelService.updateById(id, dto);
    return NomenclatureResponseMapper.toModelItem(model);
  }

  @ApiOperation({ summary: 'Delete model by id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteById(@Param('id') id: string): Promise<void> {
    return await this.modelService.deleteById(id);
  }
}
