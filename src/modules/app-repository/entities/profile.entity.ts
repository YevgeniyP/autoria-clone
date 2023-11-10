import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'varchar', length: 50, default: '' })
  name: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  surname: string;

  @Column({ type: 'varchar', length: 13, default: '' })
  phone: string;

  @Column({ type: 'varchar', default: '' })
  image: string;
}
