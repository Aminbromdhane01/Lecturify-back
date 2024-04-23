import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUploadedFileException extends HttpException {
  constructor() {
    super(
      envConstants.LocalImageUpload.UPLOADED_FILE_IS_INVALID_MESSAGE,
      HttpStatus.BAD_REQUEST,
    );
  }
}
