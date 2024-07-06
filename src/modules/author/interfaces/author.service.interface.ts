import type { Author } from '../author.entity';
import type { CreateAuthorDto } from '../dto/create-author.dto';

export const AUTHOR_SERVICE = 'AUTHOR_SERVICE';
export interface IAuthorService {
  createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author>;
  deleteAuthor(id: number): Promise<number>;
  getAllAuthors(): Promise<Author[]>;
}
