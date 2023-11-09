import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get databaseHost(): string {
    return this.configService.get('POSTGRES_HOST');
  }

  get databasePort(): number {
    return this.configService.get('POSTGRES_PORT');
  }

  get databaseUser(): string {
    return this.configService.get('POSTGRES_USER');
  }

  get databasePassword(): string {
    return this.configService.get('POSTGRES_PASSWORD');
  }

  get databaseName(): string {
    return this.configService.get('POSTGRES_DB');
  }

  get hashSalt(): number {
    return this.configService.get('HASH_SALT');
  }

  get jwtSecret(): string {
    return this.configService.get('JWT_SECRET');
  }
}
