import { envConstants } from '@app/config/constants';
import type { Book } from '@app/modules/book/book.entity';
import type { AddBookToWishlistDto } from '@app/modules/book/dto/add-book-to-wishlist.dto';
import type { CreateBookDto } from '@app/modules/book/dto/create.book.dto';
import type { GetBooksByPaginationDto } from '@app/modules/book/dto/get-book-by-pagination.dto';
import type { GetBooksCountByMonthResponseDto } from '@app/modules/book/dto/get-books-count-by-month-response-dto';
import type { BooksGroupedByGenreDtoResponse } from '@app/modules/book/dto/get-books-grouped-by-genre-response-dto';
import type { PaginationResponseDto } from '@app/modules/book/dto/pagination-response.dto';
import type { UpdateBookDto } from '@app/modules/book/dto/update-book.dto';
import type { User } from '@app/modules/user/user.entity';

export const BOOK_SERVICE = envConstants.BookModule.BOOK_SERVICE;
export interface IBookService {
  createBook(
    book: CreateBookDto,
    content: Express.Multer.File,
    image: Express.Multer.File,
  ): Promise<Book>;
  getAll({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<PaginationResponseDto<Book>>;
  findBookById(id: number): Promise<Book | null>;
  deleteBook(id: number): Promise<number>;
  updateBook(
    id: number,
    book: UpdateBookDto,
    content: Express.Multer.File | undefined,
    image: Express.Multer.File | undefined,
  ): Promise<Book | null>;
  findAllByTitle({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<PaginationResponseDto<Book>>;
  addBookToWishlist({
    userId,
    bookId,
  }: AddBookToWishlistDto): Promise<User>;
  getBooksByUserId(userId: number): Promise<PaginationResponseDto<Book>>;
  getTotalBooksCount(): Promise<number>;
  getBooksAddedThisWeekCount(): Promise<number>;
  getBooksGroupedByGenre(): Promise<BooksGroupedByGenreDtoResponse[]>;
  getBooksCountByMonth(): Promise<GetBooksCountByMonthResponseDto[]>;
  getRecommandedBooks(): Promise<Book[]>;
}
