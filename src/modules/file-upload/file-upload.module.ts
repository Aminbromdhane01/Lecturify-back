import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { FILE_UPLOAD_SERVICE } from './interfaces/file-upload.service.interface';


@Module({
    providers: [...CloudinaryProvider],
    exports: [FILE_UPLOAD_SERVICE]
})
export class CloudinaryModule { }