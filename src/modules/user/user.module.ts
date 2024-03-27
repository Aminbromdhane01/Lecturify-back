import { Module } from '@nestjs/common';
import { UserController } from '@app/modules/user/user.controller';
import { USER_SERVICE } from '@app/modules/user/interfaces/user.service.interface';
import { USER_REPOSITORY } from '@app/modules/user/interfaces/user.repository.interface';
import { userProviders } from './providers/user.provider';

@Module({
  controllers: [UserController],
  providers: [
    ...userProviders,
  ],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class UserModule { }
