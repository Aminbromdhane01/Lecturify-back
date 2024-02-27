import { AbstractGenericRepository } from "@app/baserepository";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../user.entity";
export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository extends AbstractGenericRepository<User> {

    createUser(user: CreateUserDto): Promise<User>;
    findByemail(email: string): Promise<User>;
    updateUser(id: string, user: UpdateUserDto): Promise<User>;

}