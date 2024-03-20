import { envConstants } from '@app/config/constantes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessDeniedExeption extends HttpException {
    constructor() {
        super(envConstants.HttpExceptionsMessage.ACCESS_DENIED, HttpStatus.NOT_FOUND);
    }
}
