import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AbusiveCommentException extends HttpException {
  constructor() {
    super(
      envConstants.CommentModule.ABUSIVE_COMMENT_MESSAGE,
      HttpStatus.FORBIDDEN,
    );
  }
}
