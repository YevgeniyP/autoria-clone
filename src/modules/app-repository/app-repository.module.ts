import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppConfigService } from '../app-config/app-config.service';
import { AuthModule } from '../auth/auth.module';
import { BrandEntity } from './entities/brand.entity';
import { ModelEntity } from './entities/model.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UserEntity } from './entities/user.entity';
import { BrandRepository } from './repositories/brand.repository';
import { ModelRepository } from './repositories/model.repository';
import { ProfileRepository } from './repositories/profile.repository';
import { UserRepository } from './repositories/user.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        type: 'postgres',
        host: appConfigService.databaseHost,
        port: appConfigService.databasePort,
        username: appConfigService.databaseUser,
        password: appConfigService.databasePassword,
        database: appConfigService.databaseName,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: false,
        autoLoadEntities: false,
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      ProfileEntity,
      BrandEntity,
      ModelEntity,
    ]),
    AuthModule,
  ],
  providers: [
    UserRepository,
    ProfileRepository,
    BrandRepository,
    ModelRepository,
  ],
  exports: [
    UserRepository,
    ProfileRepository,
    BrandRepository,
    ModelRepository,
  ],
})
export class AppRepositoryModule {}
