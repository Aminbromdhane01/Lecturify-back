import { Inject, Injectable } from '@nestjs/common';

import {
  FILE_UPLOAD_SERVICE,
  IFileUploadService,
} from '../file-upload/interfaces/file-upload.service.interface';
import type { Book } from './book.entity';
import type { CreateBookDto } from './dto/create.book.dto';
import type { GetBooksByPaginationDto } from './dto/get-book-by-pagination.dto';
import type { UpdateBookDto } from './dto/update-book.dto';
import {
  BOOK_REPOSITORY,
  IBookRepository,
} from './interfaces/book.repository.interface';
import type { IBookService } from './interfaces/book.service.interface';

@Injectable()
export class BookService implements IBookService {
  @Inject(BOOK_REPOSITORY)
  private readonly bookRepository: IBookRepository;

  @Inject(FILE_UPLOAD_SERVICE)
  private readonly fileUploadService: IFileUploadService;

  async createBook(
    book: CreateBookDto,
    content: Express.Multer.File,
    image: Express.Multer.File,
  ): Promise<Book> {
    const file = await this.fileUploadService.uploadFile(content);
    book.content = file?.url;
    const uploadedImage = await this.fileUploadService.uploadFile(image);
    book.image = uploadedImage?.url;

    return this.bookRepository.createBook(book);
  }

  async getAll({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<{ data: Book[]; count: number }> {
    return this.bookRepository.getAll({
      itemPerPage,
      page,
      keyword,
    });
  }

  async findBookById(id: number): Promise<Book | null> {
    return this.bookRepository.getBookbyId(id);
  }

  async deleteBook(id: number): Promise<number> {
    return this.bookRepository.deleteBook(id);
  }

  async updateBook(
    id: number,
    book: UpdateBookDto,
    content: Express.Multer.File | undefined,
    image: Express.Multer.File | undefined,
  ): Promise<Book | null> {
    if (content) {
      const file = await this.fileUploadService.uploadFile(content);
      book.content = file?.url;
    }

    if (image) {
      const uploadedImage = await this.fileUploadService.uploadFile(image);
      book.image = uploadedImage?.url;
    }

    return this.bookRepository.updateBook(id, book);
  }
}
