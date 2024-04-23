import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadedTypeIsNotSupportedException extends HttpException {
  constructor() {
    super(
      envConstants.LocalImageUpload
        .UPLOADED_FILE_TYPE_IS_NOT_SUPPORTED_MESSAGE,
      HttpStatus.BAD_REQUEST,
    );
  }
}
