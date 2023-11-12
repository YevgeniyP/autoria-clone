import { Module } from '@nestjs/common';

import { AppConfigModule } from './modules/app-config/app-config.module';
import { AppRepositoryModule } from './modules/app-repository/app-repository.module';
import { AuthModule } from './modules/auth/auth.module';
import { NomenclatureModule } from './modules/nomenclature/nomenclature.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    AppConfigModule,
    AppRepositoryModule,
    AuthModule,
    ProfileModule,
    NomenclatureModule,
  ],
})
export class AppModule {}
