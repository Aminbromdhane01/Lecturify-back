import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotFound extends HttpException {
  constructor() {
    super(
      envConstants.BookModule.BOOK_NOT_FOUND_MESSAGE,
      HttpStatus.BAD_REQUEST,
    );
  }
}
