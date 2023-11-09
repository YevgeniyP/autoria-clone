import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppConfigService } from '../app-config/app-config.service';
import { ProfileEntity } from './entities/profile.entity';
import { UserEntity } from './entities/user.entity';
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
    TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class AppRepositoryModule {}