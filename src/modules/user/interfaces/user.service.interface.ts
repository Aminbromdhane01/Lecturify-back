import type { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import type { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import type { User } from '@app/modules/user/user.entity';

export const USER_SERVICE = 'USER_SERVICE';
export interface IUserService {
  createUser(user: CreateUserDto): Promise<User>;
  findAllusers(): Promise<{ data: User[]; count: number }>;
  findUserbyid(id: string): Promise<User>;
  findUserbyemail(email: string): Promise<User | null>;
  deleteUser(id: string): Promise<number>;
  updateUser(
    id: string,
    user: UpdateUserDto,
    picture?: Express.Multer.File | undefined,
  ): Promise<User>;
  findUserbyToken(token: string): Promise<User>;
  findUserWishlist(id: number): Promise<User | null>;
  saveUser(user: User): Promise<User>;
}
