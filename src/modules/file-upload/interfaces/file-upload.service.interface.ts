import { FileDelteResponseDto } from "@app/modules/dto/file-delete.dto";
import { CloudinaryResponse } from "../file-upload.type";
import { envConstants } from "@app/config/constants";
export const FILE_UPLOAD_SERVICE = envConstants.Cloudinary.FILE_UPLOAD_SERVICE

export interface IFileUploadService {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>
    deleteFile(publicId: string): Promise<FileDelteResponseDto>
    deleteFileByUrl(url: string): Promise<FileDelteResponseDto>

}