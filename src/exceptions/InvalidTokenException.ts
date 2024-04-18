import { envConstants } from "@app/config/constants";
import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidTokenException extends HttpException {
    constructor() {
        super(envConstants.HttpExceptionsMessage.INVALID_TOKEN_RESPONSE_MESSAGE, HttpStatus.UNAUTHORIZED);
    }
}
