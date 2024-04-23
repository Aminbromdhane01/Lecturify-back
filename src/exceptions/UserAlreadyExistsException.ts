import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExitsException extends HttpException {
  constructor() {
    super(
      envConstants.HttpExceptionsMessage.USER_ALREADY_EXISTS,
      HttpStatus.CONFLICT,
    );
  }
}
