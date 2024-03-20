import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from './bcrypt.service.interface';
import { envConstants } from '@app/config/constantes';

@Injectable()
export class BcryptService implements IBcryptService {
    @Inject(envConstants.Bcrypt.BCRYPT)
    private readonly bcrypt: typeof bcrypt


    async hashData(data: string): Promise<string> {
        const saltRounds = 10;
        return this.bcrypt.hash(data, saltRounds);
    }

    async comparePasswords(
        inputPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return this.bcrypt.compare(inputPassword, hashedPassword);
    }
    generateToken(expireInMinutes: number): string {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + expireInMinutes);
        const token = `TOKEN_${expirationDate.getTime()}_${Math.random()}`;
        return token;
    }

    async generateHashedToken(expireInMinutes: number): Promise<string> {
        const token = this.generateToken(expireInMinutes);
        const saltRounds = 10;
        const hashedToken = await bcrypt.hash(token, saltRounds);
        return hashedToken;
    }
}