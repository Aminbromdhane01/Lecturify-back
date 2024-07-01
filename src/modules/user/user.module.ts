import { USER_REPOSITORY } from '@app/modules/user/interfaces/user.repository.interface';
import { USER_SERVICE } from '@app/modules/user/interfaces/user.service.interface';
import { UserController } from '@app/modules/user/user.controller';
import { Module } from '@nestjs/common';

import { CloudinaryModule } from '../file-upload/file-upload.module';
import { userProviders } from './providers/user.provider';

@Module({
  imports: [CloudinaryModule],
  controllers: [UserController],
  providers: [...userProviders],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class UserModule {}
