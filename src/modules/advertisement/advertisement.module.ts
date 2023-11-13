import { Module } from '@nestjs/common';

import { CurrencyExchangeModule } from '../currency-exchange/currency-exchange.module';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './advertisement.service';

@Module({
  imports: [CurrencyExchangeModule],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
})
export class AdvertisementModule {}
