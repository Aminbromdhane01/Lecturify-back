import { Module } from "@nestjs/common";
import { BcryptService } from "./bcrypt.service";
import { BcryptProvider } from "./bcrypt.provider";
import { envConstants } from "@app/config/constantes";

@Module({
    providers: [
        BcryptProvider,
        BcryptService,
    ],
    exports: [envConstants.Bcrypt.BCRYPT, BcryptService], // Remove the comma after 'bcrypt'
})
export class BcryptModule { }