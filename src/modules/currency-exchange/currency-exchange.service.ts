import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

import { ICurrencyResponse } from './types/currency-response.interface';

@Injectable()
export class CurrencyExchangeService {
  constructor(private readonly httpService: HttpService) {}

  public async getExchangeRates(): Promise<ICurrencyResponse[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ICurrencyResponse[]>(
          'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11',
        )
        .pipe(
          catchError((error: AxiosError) => {
            Logger.error(error);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
