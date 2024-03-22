import { AuthService } from "./auth.service";
import { AUTH_SERVICE } from "./interfaces/auth.service.interface";

export const authServiceProvider = {
    provide: AUTH_SERVICE,
    useClass: AuthService,
};