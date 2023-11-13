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
import { BrandService } from './brand.service';
import { BrandResponseMapper } from './brand-response.mapper';
import { BrandDto } from './dto/brand.dto';
import { CreateBrandDto } from './dto/create-brand.dto';

@ApiTags('Brands')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Role(RoleEnum.SELLER, RoleEnum.MANAGER, RoleEnum.ADMIN)
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  public async findAll(): Promise<BrandDto[]> {
    const brands = await this.brandService.findAll();
    return BrandResponseMapper.toBrandList(brands);
  }

  @ApiOperation({ summary: 'Create new brand' })
  @Post()
  public async create(@Body() dto: CreateBrandDto): Promise<BrandDto> {
    const brand = await this.brandService.create(dto);
    return BrandResponseMapper.toBrandItem(brand);
  }

  @ApiOperation({ summary: 'Update brand by id' })
  @Patch(':id')
  public async updateById(
    @Param('id') id: string,
    @Body() dto: CreateBrandDto,
  ): Promise<BrandDto> {
    const brand = await this.brandService.updateById(id, dto);
    return BrandResponseMapper.toBrandItem(brand);
  }
}
