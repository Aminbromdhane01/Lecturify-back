import { Injectable } from "@nestjs/common";
import { IFileUploadService } from "./interfaces/file-upload.service.interface";
import { FileDelteResponseDto } from "../dto/file-delete.dto";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from "./file-upload.type";
import { envConstants } from "@app/config/constants";

const streamifier = require('streamifier');

@Injectable()
export class FileUploadService implements IFileUploadService {

    public async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    deleteFileByUrl(url: string): Promise<FileDelteResponseDto> {
        const publicId = this.getPublicIdFromUrl(url);
        if (!publicId) {
            return Promise.reject(new Error(envConstants.Cloudinary.INVALID_URL_ERROR_MESSAGE));
        }

        return this.deleteFile(publicId);
    }
    private getPublicIdFromUrl(url: string): string | null {

        const urlParts = url.split('/');
        if (urlParts.length === 0) {
            return null;
        }
        const deleteUrl = urlParts[urlParts.length - 1].split('.')[0];
        console.log(deleteUrl);
        return deleteUrl;
    }

    deleteFile(publicId: string): Promise<FileDelteResponseDto> {
        return new Promise<FileDelteResponseDto>((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }

}