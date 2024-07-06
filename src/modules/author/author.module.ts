import { Module } from '@nestjs/common';

import { AuthorController } from './author.controller';
import { AUTHOR_REPOSITORY } from './interfaces/author.repository.interface';
import { AUTHOR_SERVICE } from './interfaces/author.service.interface';
import { authorProviders } from './providers/author.providers';

@Module({
  controllers: [AuthorController],
  providers: [...authorProviders],
  exports: [AUTHOR_SERVICE, AUTHOR_REPOSITORY],
})
export class AuthorModule {}
