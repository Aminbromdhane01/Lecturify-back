import { envConstants } from '@app/config/constants';
import type { User } from '@app/modules/user/user.entity';

import type { Book } from '../book.entity';
import type { AddBookToWishlistDto } from '../dto/add-book-to-wishlist.dto';
import type { CreateBookDto } from '../dto/create.book.dto';
import type { GetBooksByPaginationDto } from '../dto/get-book-by-pagination.dto';
import type { UpdateBookDto } from '../dto/update-book.dto';

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
  }: GetBooksByPaginationDto): Promise<{ data: Book[]; count: number }>;
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
  }: GetBooksByPaginationDto): Promise<{ data: Book[]; count: number }>;
  addBookToWishlist({
    userId,
    bookId,
  }: AddBookToWishlistDto): Promise<User>;
  getBooksByUserId(
    userId: number,
  ): Promise<{ data: Book[]; count: number }>;
}
