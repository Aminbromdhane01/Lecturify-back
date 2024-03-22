import { Module } from "@nestjs/common";
import { BcryptService } from "./bcrypt.service";
import { BcryptProvider } from "./bcrypt.provider";
import { envConstants } from "@app/config/constants";
import { BCRYPT_SERVICE } from "./bcrypt.service.interface";

@Module({
    providers: [
        BcryptProvider,
        {
            provide: BCRYPT_SERVICE,
            useClass: BcryptService
        },
    ],
    exports: [envConstants.Bcrypt.BCRYPT, BCRYPT_SERVICE],
})
export class BcryptModule { }