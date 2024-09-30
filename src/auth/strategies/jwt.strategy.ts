import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { CONSTANTS } from 'src/common/constants';
import { iUserAuth } from 'src/common/interfaces/common.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONSTANTS.jwtSecretKey
    });
  }

  async validate(payload: iUserAuth): Promise<iUserAuth> {
    const userPayload = await this.authService.parseUserDetail(payload);
    return userPayload;
  }
}
