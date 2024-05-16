import { envConstants } from '@app/config/constants';
import type { Book } from '@app/modules/book/book.entity';
import type { CreateBookDto } from '@app/modules/book/dto/create.book.dto';
import type { GetBooksByPaginationDto } from '@app/modules/book/dto/get-book-by-pagination.dto';
import type { GetBooksCountByMonthResponseDto } from '@app/modules/book/dto/get-books-count-by-month-response-dto';
import type { BooksGroupedByGenreDtoResponse } from '@app/modules/book/dto/get-books-grouped-by-genre-response-dto';
import type { PaginationResponseDto } from '@app/modules/book/dto/pagination-response.dto';
import type { UpdateBookDto } from '@app/modules/book/dto/update-book.dto';

export const BOOK_REPOSITORY = envConstants.BookModule.BOOK_REPOSITORY;
export interface IBookRepository {
  createBook(book: CreateBookDto): Promise<Book>;
  getAll({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<PaginationResponseDto<Book>>;
  getBookbyId(id: number): Promise<Book | null>;
  deleteBook(id: number): Promise<number>;
  updateBook(id: number, book: UpdateBookDto): Promise<Book | null>;
  findAllByTitle({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<PaginationResponseDto<Book>>;
  getBooksByUserId(userId: number): Promise<PaginationResponseDto<Book>>;
  getTotalBooksCount(): Promise<number>;
  getBooksAddedThisWeekCount(): Promise<number>;
  getBooksGroupedByGenre(): Promise<BooksGroupedByGenreDtoResponse[]>;
  getBooksCountByMonth(): Promise<GetBooksCountByMonthResponseDto[]>;
  getRecommandedBooks(): Promise<Book[]>;
}
