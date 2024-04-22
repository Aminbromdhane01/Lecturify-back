import { envConstants } from '@app/config/constants';
import { ImageMaxSizeException } from '@app/exceptions/ImageMaxSizeException';
import { InvalidUploadedFileException } from '@app/exceptions/InvalidUploadedFileException';
import { PdfFileMaxSizeException } from '@app/exceptions/PdfFileMaxSizeException';
import { UploadedTypeIsNotSupportedException } from '@app/exceptions/UploadedTypeIsNotSupportedException';
import { Injectable, PipeTransform, BadRequestException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class FileUploadValidationPipe implements PipeTransform {
    @Inject(ConfigService)
    private configService: ConfigService;
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

        if (file.mimetype === envConstants.LocalImageUpload.PDF_MIMETYPE && (!file.size || file.size > this.configService.get(envConstants.LocalImageUpload.MAX_SIZE_PDF))) {
            throw new PdfFileMaxSizeException();
        }

        if (!file.size || file.size > this.configService.get(envConstants.LocalImageUpload.MAX_SIZE_IMAGE)) {
            throw new ImageMaxSizeException();
        }

        return file;
    }
}