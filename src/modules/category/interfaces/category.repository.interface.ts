import type { Category } from '../category.entity';
import type { CreateCategoryDto } from '../dto/create-category.dto';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';
export interface ICategoryRepository {
  createCategory(createCategorydto: CreateCategoryDto): Promise<Category>;
  deleteCategory(id: number): Promise<number>;
  getAll(): Promise<Category[]>;
}
