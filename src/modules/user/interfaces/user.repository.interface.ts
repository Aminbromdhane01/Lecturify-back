import type { AbstractGenericRepository } from '@app/comon/baserepository';
import type { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import type { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import type { User } from '@app/modules/user/user.entity';
export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository extends AbstractGenericRepository<User> {
  createUser(user: CreateUserDto): Promise<User>;
  findByemail(email: string): Promise<User | null>;
  updateUser(id: string, user: UpdateUserDto): Promise<User | null>;
  findbyResetToken(token: string): Promise<User | null>;
  findUserWishlist(id: number): Promise<User | null>;
  saveUser(user: User): Promise<User>;
}
