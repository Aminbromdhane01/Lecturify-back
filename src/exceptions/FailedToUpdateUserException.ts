import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToUpdateUserException extends HttpException {
  constructor() {
    super(
      envConstants.HttpExceptionsMessage.FAILED_TO_UPDATE_USER_MESSAGE,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
