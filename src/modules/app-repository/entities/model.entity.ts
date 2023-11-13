import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { BrandEntity } from './brand.entity';

@Entity({ name: 'model' })
export class ModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  title: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.models)
  @JoinColumn()
  brand: BrandEntity;

  @OneToMany(() => AdvertisementEntity, (advertisement) => advertisement.brand)
  advertisements: AdvertisementEntity[];
}
