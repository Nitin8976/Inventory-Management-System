import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { iUserAuth } from 'src/common/interfaces/common.interface';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request?.headers;

    if (!authorization) {
      return false;
    }

    const user = await this.validate(authorization) as iUserAuth;
    request.user = user;
    request.ability = user.permissions;
    return true;
  }

  async validate(bearerToken: string) {
    const [tokenType, token] = bearerToken.split(' ');

    if (tokenType === 'Bearer') {
      return this.jwtService.verify(token, { secret: 'secret_key' });
    } else {
      throw new UnauthorizedException('Token is invalid.');
    }
  }
}
