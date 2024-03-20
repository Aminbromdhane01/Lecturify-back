import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
    constructor() {
        super('User not FoundDD', HttpStatus.NOT_FOUND);
    }
}
