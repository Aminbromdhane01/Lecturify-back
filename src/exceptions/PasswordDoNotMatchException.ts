import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordDoNotMatchException extends HttpException {
    constructor() {
        super(envConstants.HttpExceptionsMessage.PASSWORDS_DO_NOT_MATCH, HttpStatus.BAD_REQUEST);
    }
}
