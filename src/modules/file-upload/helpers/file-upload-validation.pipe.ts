import { ImageMaxSizeException } from '@app/exceptions/ImageMaxSizeException';
import { InvalidUploadedFileException } from '@app/exceptions/InvalidUploadedFileException';
import { UploadedTypeIsNotSupportedException } from '@app/exceptions/UploadedTypeIsNotSupportedException';
import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadValidationPipe implements PipeTransform {
  constructor(
    private maxSize: number,
    private allowedMimeTypes: string[],
  ) {}

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file.mimetype) {
      throw new InvalidUploadedFileException();
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new UploadedTypeIsNotSupportedException();
    }

    if (file.size === 0 || file.size > this.maxSize) {
      throw new ImageMaxSizeException(this.maxSize);
    }

    return file;
  }
}
