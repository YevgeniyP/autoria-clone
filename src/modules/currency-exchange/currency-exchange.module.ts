import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CurrencyExchangeService } from './currency-exchange.service';

@Module({
  imports: [HttpModule],
  providers: [CurrencyExchangeService],
  exports: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
