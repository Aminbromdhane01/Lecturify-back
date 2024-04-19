import { envConstants } from '@app/config/constants';
import { ImageMaxSizeException } from '@app/exceptions/ImageMaxSizeException';
import { InvalidUploadedFileException } from '@app/exceptions/InvalidUploadedFileException';
import { PdfFileMaxSizeException } from '@app/exceptions/PdfFileMaxSizeException';
import { UploadedTypeIsNotSupportedException } from '@app/exceptions/UploadedTypeIsNotSupportedException';
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';


@Injectable()
export class FileUploadValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File): Express.Multer.File {
        if (!file || !file.mimetype) {
            throw new InvalidUploadedFileException()
        }

        const allowedFileTypes = envConstants.LocalImageUpload.ALLOWED_FILE_TYPES;
        const allowedFileExtensions = envConstants.LocalImageUpload.ALLOWED_FILE_EXTENSIONS;

        const isValidType = allowedFileTypes.includes(file.mimetype);
        const isValidExtension = allowedFileExtensions.some(ext => file.originalname.endsWith(ext));

        if (!isValidType || !isValidExtension) {
            throw new UploadedTypeIsNotSupportedException();
        }

        if (file.mimetype === envConstants.LocalImageUpload.PDF_MIMETYPE && (!file.size || file.size > 50 * 1024 * 1024)) {
            throw new PdfFileMaxSizeException();
        }

        if (!file.size || file.size > 3 * 1024 * 1024) {
            throw new ImageMaxSizeException();
        }

        return file;
    }
}