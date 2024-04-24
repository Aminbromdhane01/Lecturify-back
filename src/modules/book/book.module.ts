import { Module } from '@nestjs/common';

import { CloudinaryModule } from '../file-upload/file-upload.module';
import { BookController } from './book.controller';
import { BookProviders } from './providers/book.providers';

@Module({
  imports: [CloudinaryModule],
  controllers: [BookController],
  providers: [...BookProviders],
})
export class BookModule {}
