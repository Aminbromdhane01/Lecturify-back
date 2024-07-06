import type { Author } from '../author.entity';
import type { CreateAuthorDto } from '../dto/create-author.dto';

export const AUTHOR_REPOSITORY = 'AUTHOR_REPOSITORY';
export interface IAuthorRepository {
  createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author>;
  deleteAuthor(id: number): Promise<number>;
  getAll(): Promise<Author[]>;
}
