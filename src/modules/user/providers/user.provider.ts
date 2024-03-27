import { Provider } from "@nestjs/common";
import { USER_SERVICE } from "../interfaces/user.service.interface";
import { UserService } from "../user.service";

const userProviders: Provider[] = [
    {
        provide: USER_SERVICE,
        useClass: UserService
    },
    {
        provide: USER_SERVICE,
        useClass: UserService
    },
];


export { userProviders };