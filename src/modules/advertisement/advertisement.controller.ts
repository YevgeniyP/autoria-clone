import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/decorators/role.decorator';
import { PaginationResponseDto } from '../../common/helper/pagination-response.dto';
import { PaginationResponseMapper } from '../../common/helper/pagination-response.mapper';
import { AdvertisementEntity } from '../app-repository/entities/advertisement.entity';
import { RoleEnum } from '../auth/enum/role.enum';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementResponseMapper } from './advertisement-response.mapper';
import { AdvertisementQueryDto } from './dto/advertisement-query.dto';
import { AdvertisementResponseDto } from './dto/advertisement-response.dto';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';

@ApiTags('Advertisement')
@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @ApiOperation({ summary: 'Get all advertisements with query' })
  @Get()
  public async findAll(
    @Query() query: AdvertisementQueryDto,
  ): Promise<PaginationResponseDto<AdvertisementEntity>> {
    const advertisements = await this.advertisementService.findAll(query);
    return PaginationResponseMapper.toPaginationResponse<AdvertisementEntity>(
      advertisements,
      query,
    );
  }

  @ApiOperation({ summary: 'Get advertisement by id' })
  @Get(':id')
  public async findById(
    @Param('id') id: string,
  ): Promise<AdvertisementResponseDto> {
    const advertisement = await this.advertisementService.findById(id);
    return AdvertisementResponseMapper.toFullAdvertisementResponse(
      advertisement,
    );
  }

  @ApiOperation({ summary: 'Create advertisement' })
  @Role(RoleEnum.SELLER, RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  @Post()
  public async createAdvertisement(
    @CurrentUser('id') user: string,
    @Body() dto: CreateAdvertisementDto,
  ): Promise<AdvertisementResponseDto> {
    const advertisement = await this.advertisementService.createAdvertisement(
      user,
      dto,
    );
    return AdvertisementResponseMapper.toFullAdvertisementResponse(
      advertisement,
    );
  }

  @ApiOperation({ summary: 'To draft advertisement by id' })
  @Role(RoleEnum.SELLER, RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  @Post('toDraft/:id')
  public async toDraftById(
    @Param('id') id: string,
  ): Promise<AdvertisementResponseDto> {
    const advertisement = await this.advertisementService.toDraftById(id);
    return AdvertisementResponseMapper.toFullAdvertisementResponse(
      advertisement,
    );
  }

  @ApiOperation({ summary: 'Publish advertisement by id' })
  @Role(RoleEnum.SELLER, RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  @Post('toPublished/:id')
  public async toPublishedById(
    @Param('id') id: string,
  ): Promise<AdvertisementResponseDto> {
    const advertisement = await this.advertisementService.toDraftById(id);
    return AdvertisementResponseMapper.toFullAdvertisementResponse(
      advertisement,
    );
  }

  @ApiOperation({ summary: 'Archive advertisement by id' })
  @Role(RoleEnum.SELLER, RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  @Post('ToArchived/:id')
  public async toArchivedById(
    @Param('id') id: string,
  ): Promise<AdvertisementResponseDto> {
    const advertisement = await this.advertisementService.toDraftById(id);
    return AdvertisementResponseMapper.toFullAdvertisementResponse(
      advertisement,
    );
  }
}
