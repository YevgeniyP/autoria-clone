import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  readonly result: T[];

  readonly meta: PageMetaDto;
}
