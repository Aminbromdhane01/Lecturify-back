import { USER_REPOSITORY } from "../interfaces/user.repository.interface";
import { UserRepository } from "../user.repository";

export const userRepositoryProvider = {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
};