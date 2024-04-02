import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExitsException extends HttpException {
    constructor() {
        super('User Already Exist', HttpStatus.CONFLICT);
    }
}
