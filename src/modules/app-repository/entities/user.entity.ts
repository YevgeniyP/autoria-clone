import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AccountTypeEnum } from '../../auth/enum/account-type.enum';
import { RoleEnum } from '../../auth/enum/role.enum';
import { ProfileEntity } from './profile.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 25, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 316, unique: true })
  email: string;

  @Column({ type: 'bytea' })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.SELLER })
  role: RoleEnum;

  @Column({
    type: 'enum',
    enum: AccountTypeEnum,
    default: AccountTypeEnum.BASIC,
  })
  accountType: AccountTypeEnum;

  @Column({ type: 'boolean', default: false })
  isBanned: boolean;

  @OneToOne(() => ProfileEntity, (userprofile) => userprofile.user)
  profile: ProfileEntity;
}
