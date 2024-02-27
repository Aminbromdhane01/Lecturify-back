import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { USER_SERVICE } from './interfaces/user.service.interface';
import { USER_REPOSITORY } from './interfaces/user.repository.interface';

@Module({
  controllers: [UserController],
  providers: [UserService,
    UserRepository,
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class UserModule { }
