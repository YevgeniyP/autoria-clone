import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CurrencyEnum } from '../../advertisement/enum/currency.enum';
import { StatusEnum } from '../../advertisement/enum/status.enum';
import { BrandEntity } from './brand.entity';
import { ModelEntity } from './model.entity';
import { UserEntity } from './user.entity';

@Entity('advertisement')
export class AdvertisementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.advertisements)
  user: UserEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.advertisements)
  brand: BrandEntity;

  @ManyToOne(() => ModelEntity, (model) => model.advertisements)
  model: ModelEntity;

  @Column({ type: 'smallint', unsigned: true })
  year: number;

  @Column({ type: 'decimal', unsigned: true })
  price: number;

  @Column({ enum: CurrencyEnum, default: CurrencyEnum.UAH })
  currency: CurrencyEnum;

  @Column({ type: 'varchar', length: 40 })
  city: string;

  @Column({ enum: StatusEnum, default: StatusEnum.DRAFT })
  status: StatusEnum;

  @Column({ type: 'smallint', unsigned: true, default: 0 })
  views: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
