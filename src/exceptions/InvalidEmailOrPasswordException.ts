import { envConstants } from '@app/config/constantes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEmailOrPasswordExeption extends HttpException {
    constructor() {
        super(envConstants.HttpExceptionsMessage.INVALID_EMAIL_OR_PASSWORD, HttpStatus.NOT_FOUND);
    }
}
