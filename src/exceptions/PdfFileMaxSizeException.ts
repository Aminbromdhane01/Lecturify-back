import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PdfFileMaxSizeException extends HttpException {
    constructor() {
        super(envConstants.LocalImageUpload.UPLOADED_PDF_FILE_MAX_SIZE_MESSSAGE, HttpStatus.BAD_REQUEST);
    }
}
