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
import { BrandDto } from '../dto/request/brand.dto';
import { BrandResponseDto } from '../dto/response/brand-response.dto';
import { NomenclatureResponseMapper } from '../nomenclature-response.mapper';
import { BrandService } from '../services/brand.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  public async findAll(): Promise<any> {
    const brands = await this.brandService.findAll();
    return NomenclatureResponseMapper.toBrandList(brands);
  }

  @ApiOperation({ summary: 'Create new brand' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @Post()
  public async create(@Body() dto: BrandDto): Promise<BrandResponseDto> {
    const brand = await this.brandService.create(dto);
    return NomenclatureResponseMapper.toBrandItem(brand);
  }

  @ApiOperation({ summary: 'Update brand by id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @Patch(':id')
  public async updateById(
    @Param('id') id: string,
    @Body() dto: BrandDto,
  ): Promise<BrandResponseDto> {
    const brand = await this.brandService.updateBuId(id, dto);
    return NomenclatureResponseMapper.toBrandItem(brand);
  }

  @ApiOperation({ summary: 'Delete brand by id' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteById(@Param('id') id: string): Promise<void> {
    await this.brandService.deleteById(id);
  }
}
