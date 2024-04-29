import { envConstants } from '@app/config/constants';

import type { Book } from '../book.entity';
import type { CreateBookDto } from '../dto/create.book.dto';
import type { GetBooksByPaginationDto } from '../dto/get-book-by-pagination.dto';
import type { UpdateBookDto } from '../dto/update-book.dto';

export const BOOK_REPOSITORY = envConstants.BookModule.BOOK_REPOSITORY;
export interface IBookRepository {
  createBook(book: CreateBookDto): Promise<Book>;
  getAll({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<{ data: Book[]; count: number }>;
  getBookbyId(id: number): Promise<Book | null>;
  deleteBook(id: number): Promise<number>;
  updateBook(id: number, book: UpdateBookDto): Promise<Book | null>;
  findAllByTitle({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<{ data: Book[]; count: number }>;
}
