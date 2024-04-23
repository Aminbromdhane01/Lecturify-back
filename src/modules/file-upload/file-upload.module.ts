import { Module } from '@nestjs/common';

import { FILE_UPLOAD_SERVICE } from './interfaces/file-upload.service.interface';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
  providers: [...CloudinaryProvider],
  exports: [FILE_UPLOAD_SERVICE],
})
export class CloudinaryModule {}
