import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { iUserAuth } from '../interfaces/common.interface';

export const UserAuth = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as iUserAuth;
});
