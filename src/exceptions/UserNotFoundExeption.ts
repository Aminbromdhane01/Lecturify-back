import { envConstants } from '@app/config/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
    constructor() {
        super(envConstants.HttpExceptionsMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
