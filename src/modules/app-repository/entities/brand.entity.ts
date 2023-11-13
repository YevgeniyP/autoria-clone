import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { ModelEntity } from './model.entity';

@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  title: string;

  @OneToMany(() => ModelEntity, (model) => model.brand)
  models: ModelEntity[];

  @OneToMany(() => AdvertisementEntity, (advertisement) => advertisement.brand)
  advertisements: AdvertisementEntity[];
}
