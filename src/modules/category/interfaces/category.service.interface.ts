import type { Category } from '../category.entity';
import type { CreateCategoryDto } from '../dto/create-category.dto';

export const CATEGORY_SERVICE = 'CATEGORY_SERVICE';
export interface ICategoryService {
  createCategory(createCategorydto: CreateCategoryDto): Promise<Category>;
  deleteCategory(id: number): Promise<number>;
  getAll(): Promise<Category[]>;
}
