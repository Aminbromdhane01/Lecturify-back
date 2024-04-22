import { envConstants } from '@app/config/constants';
import { ImageMaxSizeException } from '@app/exceptions/ImageMaxSizeException';
import { InvalidUploadedFileException } from '@app/exceptions/InvalidUploadedFileException';
import { PdfFileMaxSizeException } from '@app/exceptions/PdfFileMaxSizeException';
import { UploadedTypeIsNotSupportedException } from '@app/exceptions/UploadedTypeIsNotSupportedException';
import { Injectable, PipeTransform, BadRequestException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class FileUploadValidationPipe implements PipeTransform {
    constructor(private maxSize: number, private allowedMimeTypes: string[]) { }
    transform(file: Express.Multer.File): Express.Multer.File {
        if (!file || !file.mimetype) {
            throw new InvalidUploadedFileException()
        }
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new UploadedTypeIsNotSupportedException();
        }

        if (!file.size || file.size > this.maxSize) {
            throw new ImageMaxSizeException(this.maxSize);
        }

        return file;
    }
}