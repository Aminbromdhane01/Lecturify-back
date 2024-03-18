import { Module } from '@nestjs/common';
import { UserService } from '@app/modules/user/user.service';
import { UserController } from '@app/modules/user/user.controller';
import { UserRepository } from '@app/modules/user/user.repository';
import { USER_SERVICE } from '@app/modules/user/interfaces/user.service.interface';
import { USER_REPOSITORY } from '@app/modules/user/interfaces/user.repository.interface';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class UserModule {}
