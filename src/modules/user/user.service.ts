import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service.interface';
import { User } from './user.entity';
import { IUserRepository, USER_REPOSITORY } from './interfaces/user.repository.interface';

@Injectable()
export class UserService implements IUserService {

  @Inject(USER_REPOSITORY)
  private readonly userRepository: IUserRepository;

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(user)
  }
  findAllusers(): Promise<{ data: User[], count: number }> {
    return this.userRepository.findAll('u', { itemsPerPage: 2, page: 1, keyword: 'key' });
  }
  findUserbyid(id: string): Promise<User> {
    return this.userRepository.findOnebyId('u', +id);
  }
  findUserbyemail(email: string): Promise<User> {
    return this.userRepository.findByemail(email);
  }
  deleteUser(id: string): Promise<number> {
    return this.userRepository.deleteItem('u', +id);
  }
  updateUser(id: string, user: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, user)
  }



}
