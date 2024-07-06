import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CATEGORY_REPOSITORY } from './interfaces/category.repository.interface';
import { CATEGORY_SERVICE } from './interfaces/category.service.interface';
import { categoryProviders } from './providers/category.providers';

@Module({
  controllers: [CategoryController],
  providers: [...categoryProviders],
  exports: [CATEGORY_SERVICE, CATEGORY_REPOSITORY],
})
export class CategoryModule {}
