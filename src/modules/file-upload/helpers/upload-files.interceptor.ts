import { envConstants } from "@app/config/constants"
import { FilesInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { extname } from "path"

export const UploadFilesInterceptor = FilesInterceptor(envConstants.LocalImageUpload.FILES_INTERCEPTOR_FIELDNAME, envConstants.LocalImageUpload.FIELS_INTERCEPTOR_MAX_COUNT, {
    storage: diskStorage({
        destination: './' + envConstants.LocalImageUpload.LOCAL_IMAGE_UPLOAD_DESTINATION,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            cb(null, `${randomName}${extname(file.originalname)}`)
        }
    })
})