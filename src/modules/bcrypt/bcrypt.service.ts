import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from './bcrypt.service.interface';
import { envConstants } from '@app/config/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptService implements IBcryptService {
    @Inject(envConstants.Bcrypt.BCRYPT)
    private readonly bcrypt: typeof bcrypt
    @Inject(ConfigService)
    private readonly configService: ConfigService


    async hashData(data: string, saltRounds: number): Promise<string> {
        return this.bcrypt.hash(data, saltRounds);
    }

    async comparePasswords(
        inputPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return this.bcrypt.compare(inputPassword, hashedPassword);
    }
}