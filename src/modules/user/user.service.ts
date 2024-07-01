import { FailedToUpdateUserException } from '@app/exceptions/FailedToUpdateUserException';
import { UserNotFoundException } from '@app/exceptions/UserNotFoundExeption';
import type { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import type { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '@app/modules/user/interfaces/user.repository.interface';
import type { IUserService } from '@app/modules/user/interfaces/user.service.interface';
import type { User } from '@app/modules/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';

import {
  FILE_UPLOAD_SERVICE,
  IFileUploadService,
} from '../file-upload/interfaces/file-upload.service.interface';

@Injectable()
export class UserService implements IUserService {
  @Inject(USER_REPOSITORY)
  private readonly userRepository: IUserRepository;

  @Inject(FILE_UPLOAD_SERVICE)
  private readonly fileUploadService: IFileUploadService;

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(user);
  }

  async findAllusers(): Promise<{ data: User[]; count: number }> {
    return this.userRepository.findAll('u', {
      itemsPerPage: 2,
      page: 1,
      keyword: 'key',
    });
  }

  async findUserbyid(id: string): Promise<User> {
    const user = await this.userRepository.findOnebyId('u', Number(id));

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findUserbyemail(email: string): Promise<User | null> {
    return this.userRepository.findByemail(email);
  }

  async findUserbyToken(token: string): Promise<User> {
    const user = await this.userRepository.findbyResetToken(token);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async deleteUser(id: string): Promise<number> {
    return this.userRepository.deleteItem('u', Number(id));
  }

  async updateUser(
    id: string,
    user: UpdateUserDto,
    picture?: Express.Multer.File | undefined,
  ): Promise<User> {
    if (picture) {
      const file = await this.fileUploadService.uploadFile(picture);
      user.picture = file?.url;
    }

    const UpadatedUser = await this.userRepository.updateUser(id, user);

    if (!UpadatedUser) {
      throw new FailedToUpdateUserException();
    }

    return UpadatedUser;
  }

  async findUserWishlist(id: number): Promise<User | null> {
    return this.userRepository.findUserWishlist(id);
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.saveUser(user);
  }
}
