import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../user.entity";

export const USER_SERVICE = 'USER_SERVICE';
export interface IUserService {

    createUser(user: CreateUserDto): Promise<User>;
    findAllusers(): Promise<{ data: User[], count: number }>;
    findUserbyid(id: string): Promise<User>;
    findUserbyemail(email: string): Promise<User>;
    deleteUser(id: string): Promise<number>;
    updateUser(id: string, user: UpdateUserDto): Promise<User>

}