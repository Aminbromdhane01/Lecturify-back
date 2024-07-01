import { envConstants } from '@app/config/constants';
import { InvalidTokenException } from '@app/exceptions/InvalidTokenException';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (
        info &&
        info.name === envConstants.HttpExceptionsMessage.TOKEN_EXPIRED
      ) {
        throw new InvalidTokenException();
      } else if (
        info &&
        info.name === envConstants.HttpExceptionsMessage.JWT_ERROR
      ) {
        throw new InvalidTokenException();
      } else {
        throw new UnauthorizedException();
      }
    }

    return user;
  }
}
