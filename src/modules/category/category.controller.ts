import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

import type { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  CATEGORY_SERVICE,
  ICategoryService,
} from './interfaces/category.service.interface';

@Controller('categories')
export class CategoryController {
  @Inject(CATEGORY_SERVICE)
  private readonly categoryService: ICategoryService;

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<number> {
    return this.categoryService.deleteCategory(id);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAll();
  }
}
