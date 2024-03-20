import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToUpdateUserException extends HttpException {
    constructor() {
        super('Failed to update user. Please try again later', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
