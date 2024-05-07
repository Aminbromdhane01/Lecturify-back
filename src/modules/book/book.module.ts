import { Module } from '@nestjs/common';

import { CloudinaryModule } from '../file-upload/file-upload.module';
import { UserModule } from '../user/user.module';
import { BookController } from './book.controller';
import { BookProviders } from './providers/book.providers';

@Module({
  imports: [CloudinaryModule, UserModule],
  controllers: [BookController],
  providers: [...BookProviders],
})
export class BookModule {}
