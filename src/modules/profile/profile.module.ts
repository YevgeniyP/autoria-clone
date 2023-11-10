import { Module } from '@nestjs/common';

import { AppRepositoryModule } from '../app-repository/app-repository.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [AppRepositoryModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
