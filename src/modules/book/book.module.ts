import { Module } from '@nestjs/common';

import { CloudinaryModule } from '../file-upload/file-upload.module';
import { UserModule } from '../user/user.module';
import { BookController } from './book.controller';
import { BOOK_REPOSITORY } from './interfaces/book.repository.interface';
import { BOOK_SERVICE } from './interfaces/book.service.interface';
import { BookProviders } from './providers/book.providers';

@Module({
  imports: [CloudinaryModule, UserModule],
  controllers: [BookController],
  providers: [...BookProviders],
  exports: [BOOK_SERVICE, BOOK_REPOSITORY],
})
export class BookModule {}
