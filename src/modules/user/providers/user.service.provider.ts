import { USER_SERVICE } from "../interfaces/user.service.interface";
import { UserService } from "../user.service";

export const userServiceProvider = {
    provide: USER_SERVICE,
    useClass: UserService,
};