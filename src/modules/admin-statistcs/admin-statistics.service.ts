import type { IAdminStatisticsService } from '@app/modules/admin-statistcs/admin-statistics.service.interface';
import type { GetBooksCountByMonthResponseDto } from '@app/modules/book/dto/get-books-count-by-month-response-dto';
import type { BooksGroupedByGenreDtoResponse } from '@app/modules/book/dto/get-books-grouped-by-genre-response-dto';
import {
  BOOK_SERVICE,
  IBookService,
} from '@app/modules/book/interfaces/book.service.interface';
import type { SentimentCountResponseDto } from '@app/modules/comment/dto/sentiment-count-response.dto';
import {
  COMMENT_SERVICE,
  ICommentService,
} from '@app/modules/comment/interfaces/comment.service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AdminStatisticsService implements IAdminStatisticsService {
  @Inject(BOOK_SERVICE)
  private readonly bookService: IBookService;

  @Inject(COMMENT_SERVICE)
  private readonly commentService: ICommentService;

  async getTotalBooksCount(): Promise<number> {
    return this.bookService.getTotalBooksCount();
  }

  async getBooksAddedThisWeekCount(): Promise<number> {
    return this.bookService.getBooksAddedThisWeekCount();
  }

  async getBooksGroupedByGenre(): Promise<
    BooksGroupedByGenreDtoResponse[]
  > {
    return this.bookService.getBooksGroupedByGenre();
  }

  async getBooksCountByMonth(): Promise<
    GetBooksCountByMonthResponseDto[]
  > {
    return this.bookService.getBooksCountByMonth();
  }

  async getTotalCommentsCount(): Promise<number> {
    return this.commentService.getTotalCommentsCount();
  }

  async getCommentsAddedThisWeekCount(): Promise<number> {
    return this.commentService.getCommentsAddedThisWeekCount();
  }

  async getCommentsCountBySentiment(): Promise<
    SentimentCountResponseDto[]
  > {
    return this.commentService.getCommentsCountBySentiment();
  }
}
