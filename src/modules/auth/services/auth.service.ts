import { BadRequestException, Injectable } from '@nestjs/common';

import { UserEntity } from '../../app-repository/entities/user.entity';
import { UserRepository } from '../../app-repository/repositories/user.repository';
import { LoginUserDto } from '../dto/request/login-user.dto';
import { RegisterUserDto } from '../dto/request/register-user.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async register(dto: RegisterUserDto): Promise<UserEntity> {
    const { username, email, password } = dto;
    if (await this.checkEmailExisting(email)) {
      throw new BadRequestException('Email already exists');
    }
    if (await this.checkUsernameExisting(username)) {
      throw new BadRequestException('Username already exists');
    }
    const user = this.userRepository.create(dto);
    user.password = await this.passwordService.hashPassword(password);
    await this.userRepository.save(user);
    return user;
  }

  public async login(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('Email or password is incorrect');
    }
    if (!(await this.passwordService.verifyPassword(password, user.password))) {
      throw new BadRequestException('Email or password is incorrect');
    }
    return user;
  }

  public async getMe(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  public async checkEmailExisting(email: string): Promise<boolean> {
    const checkEmail = await this.userRepository.findOneBy({ email });
    if (checkEmail) return true;
    return false;
  }

  public async checkUsernameExisting(username: string): Promise<boolean> {
    const checkUsername = await this.userRepository.findOneBy({ username });
    if (checkUsername) return true;
    return false;
  }
}
