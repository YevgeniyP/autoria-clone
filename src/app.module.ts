import { Module } from '@nestjs/common';

// import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AppRepositoryModule } from './modules/app-repository/app-repository.module';
import { AuthModule } from './modules/auth/auth.module';
// import { RoleGuard } from './modules/auth/guards/role.guard';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [AppConfigModule, AppRepositoryModule, AuthModule, ProfileModule],
  // providers: [
  //   // {
  //   //   provide: APP_GUARD,
  //   //   useClass: RoleGuard,
  //   // },
  // ],
})
export class AppModule {}
