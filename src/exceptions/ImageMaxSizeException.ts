import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ImageMaxSizeException extends HttpException {
    constructor(maxSize: number) {
        super(envConstants.LocalImageUpload.UPLOADED_FILE_MAX_SIZE_MESSSAGE + `${maxSize}`, HttpStatus.BAD_REQUEST);
    }
}
