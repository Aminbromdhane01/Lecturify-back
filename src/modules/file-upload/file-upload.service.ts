import { envConstants } from '@app/config/constants';
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

import type {
  FileDelteResponseDto,
  LocalFileDeleteResponseDto,
} from './dto/file-delete.dto';
import type { CloudinaryResponse } from './file-upload.type';
import type { IFileUploadService } from './interfaces/file-upload.service.interface';

const streamifier = require('streamifier');

@Injectable()
export class FileUploadService implements IFileUploadService {
  public async uploadFile(
    file: Express.Multer.File,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  deleteFileByUrl(url: string): Promise<FileDelteResponseDto> {
    const publicId = this.getPublicIdFromUrl(url);

    if (!publicId) {
      return Promise.reject(
        new Error(envConstants.Cloudinary.INVALID_URL_ERROR_MESSAGE),
      );
    }

    return this.deleteFile(publicId);
  }

  private getPublicIdFromUrl(url: string): string | null {
    const urlParts = url.split('/');

    if (urlParts.length === 0) {
      return null;
    }

    const deleteUrl = urlParts.at(-1).split('.')[0];
    console.log(deleteUrl);

    return deleteUrl;
  }

  deleteFile(publicId: string): Promise<FileDelteResponseDto> {
    return new Promise<FileDelteResponseDto>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  }

  async deleteLocalImage(
    filename: string,
  ): Promise<LocalFileDeleteResponseDto> {
    const imagePath = path.join(
      envConstants.LocalImageUpload.LOCAL_IMAGE_UPLOAD_DESTINATION,
      filename,
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);

      return {
        message:
          envConstants.LocalImageUpload
            .LOCAL_IMAGE_DELETED_SUCCESSFULY_IMAGE,
      };
    }

    return {
      message: envConstants.LocalImageUpload.LOCAL_IMAGE_NOT_FOUND_MESSAGE,
    };
  }
}
