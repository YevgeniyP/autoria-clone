import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
