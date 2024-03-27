import { envConstants } from "@app/config/constants";
import { Provider } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { BCRYPT_SERVICE } from "./bcrypt.service.interface";
import { BcryptService } from "./bcrypt.service";

export const BcryptProvider: Provider[] = [
    {
        provide: envConstants.Bcrypt.BCRYPT,
        useValue: bcrypt,
    },
    {
        provide: BCRYPT_SERVICE,
        useClass: BcryptService
    }
]
