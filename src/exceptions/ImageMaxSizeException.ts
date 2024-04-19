import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ImageMaxSizeException extends HttpException {
    constructor() {
        super(envConstants.LocalImageUpload.UPLOADED_IMAGE_MAX_SIZE_MESSSAGE, HttpStatus.BAD_REQUEST);
    }
}
