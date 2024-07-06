import { AbstractGenericRepository } from '@app/comon/baserepository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Category } from './category.entity';
import type { CreateCategoryDto } from './dto/create-category.dto';
import type { ICategoryRepository } from './interfaces/category.repository.interface';

@Injectable()
export class CategoryRepository
  extends AbstractGenericRepository<Category>
  implements ICategoryRepository
{
  constructor(private readonly datasource: DataSource) {
    super(datasource, Category);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.createItem('Category', createCategoryDto);
  }

  async deleteCategory(id: number): Promise<number> {
    return this.deleteItem('Category', id);
  }

  async getAll(): Promise<Category[]> {
    return this.find();
  }
}
