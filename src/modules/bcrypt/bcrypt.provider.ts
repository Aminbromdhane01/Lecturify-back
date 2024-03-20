import { envConstants } from "@app/config/constantes";
import * as bcrypt from 'bcrypt';

export const BcryptProvider = {
    provide: envConstants.Bcrypt.BCRYPT,
    useValue: bcrypt,
};