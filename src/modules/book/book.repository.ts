import { AbstractGenericRepository } from '@app/comon/baserepository';
import { Book } from '@app/modules/book/book.entity';
import type { CreateBookDto } from '@app/modules/book/dto/create.book.dto';
import type { GetBooksByPaginationDto } from '@app/modules/book/dto/get-book-by-pagination.dto';
import type { GetBooksCountByMonthResponseDto } from '@app/modules/book/dto/get-books-count-by-month-response-dto';
import type { BooksGroupedByGenreDtoResponse } from '@app/modules/book/dto/get-books-grouped-by-genre-response-dto';
import type { PaginationResponseDto } from '@app/modules/book/dto/pagination-response.dto';
import type { UpdateBookDto } from '@app/modules/book/dto/update-book.dto';
import type { IBookRepository } from '@app/modules/book/interfaces/book.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { subWeeks } from 'date-fns';
import { DataSource } from 'typeorm';

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
  }: GetBooksByPaginationDto): Promise<PaginationResponseDto<Book>> {
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
  }: GetBooksByPaginationDto): Promise<PaginationResponseDto<Book>> {
    const [data, count] = await this.createQueryBuilder('Book')
      .where('title LIKE :keyword', { keyword: `%${keyword}%` })
      .skip(page * itemPerPage)
      .take(itemPerPage)
      .getManyAndCount();

    return { data, count };
  }

  async getBooksByUserId(
    userId: number,
  ): Promise<PaginationResponseDto<Book>> {
    const [data, count] = await this.createQueryBuilder('book')
      .where('book.userId = :userId', { userId })
      .getManyAndCount();

    return { data, count };
  }

  async getTotalBooksCount(): Promise<number> {
    return this.createQueryBuilder('book').getCount();
  }

  async getBooksAddedThisWeekCount(): Promise<number> {
    const oneWeekAgo = subWeeks(new Date(), 1);

    return this.createQueryBuilder('book')
      .where('date >= :oneWeekAgo', { oneWeekAgo })
      .getCount();
  }

  async getBooksGroupedByGenre(): Promise<
    BooksGroupedByGenreDtoResponse[]
  > {
    return this.createQueryBuilder('Book')
      .select('genre')
      .addSelect('COUNT(*)', 'count')
      .groupBy('genre')
      .getRawMany();
  }

  async getBooksCountByMonth(): Promise<
    GetBooksCountByMonthResponseDto[]
  > {
    return this.createQueryBuilder('book')
      .select("DATE_FORMAT(date, '%m') AS month")
      .addSelect('COUNT(*)', 'count')
      .groupBy('month')
      .orderBy('month')
      .getRawMany();
  }

  async getRecommandedBooks(): Promise<Book[]> {
    return this.createQueryBuilder('book')
      .leftJoin('book.comments', 'comment')
      .addSelect('COUNT(comment.id)', 'positive_comment_count')
      .where('comment.sentiment = :sentiment', { sentiment: 'positive' })
      .groupBy('book.id')
      .orderBy('positive_comment_count', 'DESC')
      .getMany();
  }
}
