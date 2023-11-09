import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// import { IJwtCurrentUser } from '../types/jwt-current-user.interface';

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
