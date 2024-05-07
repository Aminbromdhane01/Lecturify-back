import { AbstractGenericRepository } from '@app/comon/baserepository';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Book } from './book.entity';
import type { CreateBookDto } from './dto/create.book.dto';
import type { GetBooksByPaginationDto } from './dto/get-book-by-pagination.dto';
import type { UpdateBookDto } from './dto/update-book.dto';
import type { IBookRepository } from './interfaces/book.repository.interface';

@Injectable()
export class BookReposotiroy
  extends AbstractGenericRepository<Book>
  implements IBookRepository
{
  constructor(
    @Inject(DataSource) private readonly datasource: DataSource,
  ) {
    super(datasource, Book);
  }

  createBook(book: CreateBookDto): Promise<Book> {
    return this.createItem('Book', book);
  }

  getAll({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<{ data: Book[]; count: number }> {
    return this.findAll('Book', {
      itemsPerPage: itemPerPage,
      page,
      keyword,
    });
  }

  getBookbyId(id: number): Promise<Book | null> {
    return this.findOnebyId('Book', id);
  }

  deleteBook(id: number): Promise<number> {
    return this.deleteItem('Book', id);
  }

  updateBook(id: number, book: UpdateBookDto): Promise<Book | null> {
    return this.updateItem('Book', id, book);
  }

  async findAllByTitle({
    itemPerPage,
    page,
    keyword,
  }: GetBooksByPaginationDto): Promise<{ data: Book[]; count: number }> {
    const [data, count] = await this.createQueryBuilder('Book')
      .where('title LIKE :keyword', { keyword: `%${keyword}%` })
      .skip(page * itemPerPage)
      .take(itemPerPage)
      .getManyAndCount();

    return { data, count };
  }

  async getBooksByUserId(
    userId: number,
  ): Promise<{ data: Book[]; count: number }> {
    const [data, count] = await this.createQueryBuilder('book')
      .where('book.userId = :userId', { userId })
      .getManyAndCount();

    return { data, count };
  }
}
