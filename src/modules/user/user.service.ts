import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import { IUserService } from '@app/modules/user/interfaces/user.service.interface';
import { User } from '@app/modules/user/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '@app/modules/user/interfaces/user.repository.interface';

@Injectable()
export class UserService implements IUserService {
  @Inject(USER_REPOSITORY)
  private readonly userRepository: IUserRepository;

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(user);
  }
  findAllusers(): Promise<{ data: User[]; count: number }> {
    return this.userRepository.findAll('u', {
      itemsPerPage: 2,
      page: 1,
      keyword: 'key',
    });
  }
  findUserbyid(id: string): Promise<User> {
    return this.userRepository.findOnebyId('u', +id);
  }
  findUserbyemail(email: string): Promise<User> {
    return this.userRepository.findByemail(email);
  }
  findUserbyToken(token: string): Promise<User> {
    return this.userRepository.findbyResetToken(token);
  }

  deleteUser(id: string): Promise<number> {
    return this.userRepository.deleteItem('u', +id);
  }
  updateUser(id: string, user: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, user);
  }
}
