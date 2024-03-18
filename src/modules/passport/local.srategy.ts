import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { signInDto } from '../auth/dto/signin-auth.dto';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  AUTH_SERVICE,
  IAuthService,
} from '../auth/interfaces/auth.service.interface';

export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject(AUTH_SERVICE)
  private readonly authService: IAuthService;
  constructor() {
    super();
  }

  async validate({ email, password }: signInDto) {
    const user = await this.authService.validateUser({ email, password });

    if (!user) return new HttpException('Unautorized', HttpStatus.UNAUTHORIZED);
    return user;
  }
}
