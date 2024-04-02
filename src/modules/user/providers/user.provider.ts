import { Provider } from "@nestjs/common";
import { USER_SERVICE } from "../interfaces/user.service.interface";
import { UserService } from "../user.service";
import { USER_REPOSITORY } from "../interfaces/user.repository.interface";
import { UserRepository } from "../user.repository";

const userProviders: Provider[] = [
    {
        provide: USER_SERVICE,
        useClass: UserService
    },
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository
    },
];


export { userProviders };