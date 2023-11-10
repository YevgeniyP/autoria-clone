import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../decorators/current-user.decorator';
import { Role } from '../../decorators/role.decorator';
import { AuthResponseMapper } from './auth-response.mapper';
import { AccountListQueryDto } from './dto/request/account-list-query.dto';
import { LoginUserDto } from './dto/request/login-user.dto';
import { RegisterUserDto } from './dto/request/register-user.dto';
import { BaseUserAccountDto } from './dto/response/base-user-account.dto';
import { BaseUserAccountWithTokenDto } from './dto/response/base-user-account-with-token.dto';
import { FullUserAccountDto } from './dto/response/full-user-account.dto';
import { RoleEnum } from './enum/role.enum';
import { JwtGuard } from './guards/jwt.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  public async register(
    @Body() dto: RegisterUserDto,
  ): Promise<BaseUserAccountDto> {
    const user = await this.authService.register(dto);
    return AuthResponseMapper.toBaseResponse(user);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  public async login(
    @Body() dto: LoginUserDto,
  ): Promise<BaseUserAccountWithTokenDto> {
    const user = await this.authService.login(dto);
    const token = await this.tokenService.generateToken(user);
    return AuthResponseMapper.toBaseResponseWithToken(user, token);
  }

  @ApiTags('Account management')
  @ApiOperation({ summary: 'Get current user' })
  @Get('me')
  @Role(RoleEnum.SELLER, RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  public async getMe(
    @CurrentUser('id') userId: string,
  ): Promise<FullUserAccountDto> {
    const user = await this.authService.getMe(userId);
    return AuthResponseMapper.toGetCurrentUser(user);
  }

  @ApiTags('Account management')
  @ApiOperation({ summary: 'Get all accounts' })
  @Get('accounts')
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  public async findAllActiveAccounts(
    @Query() query: AccountListQueryDto,
  ): Promise<any> {
    return await this.authService.findWithQuery(query);
  }

  @ApiTags('Account management')
  @ApiOperation({ summary: 'Ban account' })
  @Patch('ban/:userId')
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  public async banAccount(
    @Param('userId') id: string,
  ): Promise<BaseUserAccountDto> {
    const user = await this.authService.banAccount(id);
    return AuthResponseMapper.toBaseResponse(user);
  }

  @ApiTags('Account management')
  @ApiOperation({ summary: 'Unban account' })
  @Role(RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  @Patch('unban/:userId')
  public async unbanAccount(
    @Param('userId') id: string,
  ): Promise<BaseUserAccountDto> {
    const user = await this.authService.unbanAccount(id);
    return AuthResponseMapper.toBaseResponse(user);
  }
}
