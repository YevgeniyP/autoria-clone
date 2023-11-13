import { ApiProperty } from '@nestjs/swagger';

import { FullUserAccountDto } from '../../auth/dto/response/full-user-account.dto';
import { CurrencyEnum } from '../enum/currency.enum';
import { StatusEnum } from '../enum/status.enum';

export class AdvertisementResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: CurrencyEnum;

  @ApiProperty()
  city: string;

  @ApiProperty()
  status: StatusEnum;

  @ApiProperty()
  views: number;

  @ApiProperty()
  user: FullUserAccountDto;

  @ApiProperty()
  createdAt: Date;
}
