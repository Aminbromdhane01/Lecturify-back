import { envConstants } from '@app/config/constantes';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
type JwtPayload = {
  id: string;
  email: string;
};

export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(envConstants.JWT.JWT_ACCESS_SECRET),
    });
  }

  validate({ id, email }: JwtPayload) {
    return { id, email };
  }
}
