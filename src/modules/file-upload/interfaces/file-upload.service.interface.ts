import { envConstants } from '@app/config/constants';
import type {
  FileDelteResponseDto,
  LocalFileDeleteResponseDto,
} from '@app/modules/file-upload/dto/file-delete.dto';

import type { CloudinaryResponse } from '../file-upload.type';
export const FILE_UPLOAD_SERVICE =
  envConstants.Cloudinary.FILE_UPLOAD_SERVICE;

export interface IFileUploadService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
  deleteFile(publicId: string): Promise<FileDelteResponseDto>;
  deleteFileByUrl(url: string): Promise<FileDelteResponseDto>;
  deleteLocalImage(filename: string): Promise<LocalFileDeleteResponseDto>;
}
