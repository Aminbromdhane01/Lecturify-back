import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envConstants } from '@app/config/constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(envConstants.JWT.JWT_REFRESH_SECRET),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const authHeader = req.get(envConstants.Passport.AUTHORIZATION);
    if (authHeader === undefined) {
      throw new Error(envConstants.Passport.AUTHORIZATION_HEADER_NOT_PROVIDED);
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== envConstants.Passport.BEARER) {
      throw new Error(envConstants.Passport.INVALID_AUTHORIZATION_HEADER_FORMAT);
    }

    const refreshToken = tokenParts[1];

    return { ...payload, refreshToken };
  }
}
