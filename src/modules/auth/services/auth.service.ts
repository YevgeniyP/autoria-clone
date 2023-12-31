import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { IList } from '../../../common/types/list.interface';
import { ProfileEntity } from '../../app-repository/entities/profile.entity';
import { UserEntity } from '../../app-repository/entities/user.entity';
import { UserRepository } from '../../app-repository/repositories/user.repository';
import { AccountListQueryDto } from '../dto/request/account-list-query.dto';
import { LoginUserDto } from '../dto/request/login-user.dto';
import { RegisterUserDto } from '../dto/request/register-user.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public async register(dto: RegisterUserDto): Promise<UserEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const userRepository = manager.getRepository(UserEntity);
      const profileRepository = manager.getRepository(ProfileEntity);

      const findUserByEmail = await userRepository.findOneBy({
        email: dto.email,
      });
      if (findUserByEmail) {
        throw new BadRequestException('Email already exist');
      }
      const findUserByUsername = await userRepository.findOneBy({
        username: dto.username,
      });
      if (findUserByUsername) {
        throw new BadRequestException('Username already exist');
      }
      const user = userRepository.create(dto);
      user.password = await this.passwordService.hashPassword(dto.password);
      await userRepository.save(user);
      await profileRepository.save(profileRepository.create({ user }));
      return await userRepository.findOne({
        where: { id: user.id },
        relations: { profile: true },
      });
    });
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
    if (user.isBanned) {
      throw new BadRequestException('User is banned');
    }
    return user;
  }

  public async getMe(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  public async findWithQuery(
    query: AccountListQueryDto,
  ): Promise<IList<UserEntity>> {
    return await this.userRepository.findWithQuery(query);
  }

  public async banAccount(id: string): Promise<UserEntity> {
    const user = await this.findUserById(id);
    if (user.isBanned) {
      throw new BadRequestException('User is already banned');
    }
    user.isBanned = true;
    return await this.userRepository.save(user);
  }

  public async unbanAccount(id: string): Promise<UserEntity> {
    const user = await this.findUserById(id);
    if (!user.isBanned) {
      throw new BadRequestException('User is already unbanned');
    }
    user.isBanned = false;
    return await this.userRepository.save(user);
  }

  public async findUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
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
