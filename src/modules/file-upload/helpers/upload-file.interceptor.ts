import { envConstants } from "@app/config/constants"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { extname } from "path"

export const UploadFileInterceptor = FileInterceptor(envConstants.LocalImageUpload.FILE_INTERCEPTOR_FIELDNAME, {
    storage: diskStorage({
        destination: './' + envConstants.LocalImageUpload.LOCAL_IMAGE_UPLOAD_DESTINATION,
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            cb(null, `${randomName}${extname(file.originalname)}`)
        }
    })
})