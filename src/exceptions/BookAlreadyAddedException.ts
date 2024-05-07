import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BookAlreadyAdded extends HttpException {
  constructor() {
    super(
      envConstants.BookModule.BOOK_ALREADY_ADDED_MESSAGE,
      HttpStatus.BAD_REQUEST,
    );
  }
}
