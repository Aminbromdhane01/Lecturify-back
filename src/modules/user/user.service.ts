import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import { IUserService } from '@app/modules/user/interfaces/user.service.interface';
import { User } from '@app/modules/user/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '@app/modules/user/interfaces/user.repository.interface';
import { UserNotFoundException } from '@app/exceptions/UserNotFoundExeption';
import { FailedToUpdateUserException } from '@app/exceptions/FailedToUpdateUserException';

@Injectable()
export class UserService implements IUserService {
  @Inject(USER_REPOSITORY)
  private readonly userRepository: IUserRepository;

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(user);
  }
  async findAllusers(): Promise<{ data: User[]; count: number }> {
    return await this.userRepository.findAll('u', {
      itemsPerPage: 2,
      page: 1,
      keyword: 'key',
    });
  }
  async findUserbyid(id: string): Promise<User> {
    const user = await this.userRepository.findOnebyId('u', +id);
    if (!user) {
      throw new UserNotFoundException()
    }
    return user
  }
  async findUserbyemail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByemail(email);

    return user
  }

  async findUserbyToken(token: string): Promise<User> {
    const user = await this.userRepository.findbyResetToken(token);
    if (!user) {
      throw new UserNotFoundException()
    }
    return user
  }

  async deleteUser(id: string): Promise<number> {
    return await this.userRepository.deleteItem('u', +id);
  }
  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const UpadatedUser = await this.userRepository.updateUser(id, user);
    if (!UpadatedUser) {
      throw new FailedToUpdateUserException()
    }
    return UpadatedUser
  }
}
