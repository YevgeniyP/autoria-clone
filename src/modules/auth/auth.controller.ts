import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../decorators/current-user.decorator';
import { Role } from '../../decorators/role.decorator';
import { AuthMapper } from './auth.mapper';
import { LoginUserDto } from './dto/request/login-user.dto';
import { RegisterUserDto } from './dto/request/register-user.dto';
import { RegisteredUserDto } from './dto/response/registered-user.dto';
import { RoleEnum } from './enum/role.enum';
import { JwtGuard } from './guards/jwt.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  public async register(
    @Body() dto: RegisterUserDto,
  ): Promise<RegisteredUserDto> {
    const user = await this.authService.register(dto);
    return AuthMapper.toRegisterResponse(user);
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.login(dto);
    const token = await this.tokenService.generateToken(user);
    return AuthMapper.toLoginResponse(user, token);
  }

  @ApiOperation({ summary: 'Get current user' })
  @Get('me')
  @Role(RoleEnum.SELLER, RoleEnum.MANAGER, RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  async getMe(@CurrentUser('id') userId: string): Promise<any> {
    const user = await this.authService.getMe(userId);
    return AuthMapper.toGetCurrentUser(user);
  }
}
