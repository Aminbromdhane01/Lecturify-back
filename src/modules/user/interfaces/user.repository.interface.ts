import { AbstractGenericRepository } from '@app/comon/baserepository';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import { User } from '@app/modules/user/user.entity';
export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository extends AbstractGenericRepository<User> {
  createUser(user: CreateUserDto): Promise<User>;
  findByemail(email: string): Promise<User | null>;
  updateUser(id: string, user: UpdateUserDto): Promise<User | null>;
  findbyResetToken(token: string): Promise<User | null>;
}
