import { Inject, Injectable } from '@nestjs/common';

import type { Category } from './category.entity';
import type { CreateCategoryDto } from './dto/create-category.dto';
import {
  CATEGORY_REPOSITORY,
  ICategoryRepository,
} from './interfaces/category.repository.interface';
import type { ICategoryService } from './interfaces/category.service.interface';

@Injectable()
export class CategoryService implements ICategoryService {
  @Inject(CATEGORY_REPOSITORY)
  private readonly categoryRepository: ICategoryRepository;

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  async deleteCategory(id: number): Promise<number> {
    return this.categoryRepository.deleteCategory(id);
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }
}
