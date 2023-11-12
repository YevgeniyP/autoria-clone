import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IJwtCurrentUser } from '../../common/types/jwt-current-user.interface';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appConfigService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwtSecret || 'secret',
    });
  }

  async validate(payload: IJwtCurrentUser) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
