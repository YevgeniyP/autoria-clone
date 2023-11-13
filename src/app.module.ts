import { Module } from '@nestjs/common';

import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AppRepositoryModule } from './modules/app-repository/app-repository.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { ModelModule } from './modules/model/model.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    AppConfigModule,
    AppRepositoryModule,
    AuthModule,
    ProfileModule,
    BrandModule,
    ModelModule,
    AdvertisementModule,
  ],
})
export class AppModule {}
