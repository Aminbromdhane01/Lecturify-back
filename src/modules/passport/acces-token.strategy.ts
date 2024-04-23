import { envConstants } from '@app/config/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
export interface IJwtPayload {
  id: string;
  email: string;
}
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        envConstants.JWT.JWT_ACCESS_SECRET,
      ),
    });
  }

  validate({ id, email }: IJwtPayload) {
    return { id, email };
  }
}
