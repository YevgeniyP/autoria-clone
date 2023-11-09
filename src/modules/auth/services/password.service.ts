import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { AppConfigService } from '../../app-config/app-config.service';

@Injectable()
export class PasswordService {
  constructor(private readonly appConfigService: AppConfigService) {}

  public async hashPassword(password: string): Promise<string> {
    return await hash(password, Number(this.appConfigService.hashSalt));
  }

  public async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, String(hashedPassword));
  }
}
