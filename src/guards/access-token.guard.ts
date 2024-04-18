import { InvalidTokenException } from '@app/exceptions/InvalidTokenException';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {

    handleRequest(err: Error, user: any, info: any) {
        if (err || !user) {
            throw new InvalidTokenException();
        }
        return user;
    }


}
