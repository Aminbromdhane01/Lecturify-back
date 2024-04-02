import { envConstants } from "@app/config/constants";
import { IsNotEmptyWithMessage } from "@app/decorators/is-notempty-with-message.decorator";
import { IsStringWithMessage } from "@app/decorators/is-string-with-message.decorator";
import { IsEmail } from "class-validator";

export class ForgetDto {
    @IsNotEmptyWithMessage()
    @IsStringWithMessage()
    @IsEmail({}, { message: envConstants.AuthModule.INAVALID_EMAIL_MESSAGE })
    email: string;
}