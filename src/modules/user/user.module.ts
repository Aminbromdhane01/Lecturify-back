import { Module } from '@nestjs/common';
import { UserService } from '@app/modules/user/user.service';
import { UserController } from '@app/modules/user/user.controller';
import { UserRepository } from '@app/modules/user/user.repository';
import { USER_SERVICE } from '@app/modules/user/interfaces/user.service.interface';
import { USER_REPOSITORY } from '@app/modules/user/interfaces/user.repository.interface';
import { userServiceProvider } from './providers/user.service.provider';
import { userRepositoryProvider } from './providers/user.repository.provider';

@Module({
  controllers: [UserController],
  providers: [userServiceProvider,
    userRepositoryProvider
  ],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class UserModule { }
