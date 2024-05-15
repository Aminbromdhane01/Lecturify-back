import type { GetBooksCountByMonthResponseDto } from '@app/modules/book/dto/get-books-count-by-month-response-dto';
import type { BooksGroupedByGenreDtoResponse } from '@app/modules/book/dto/get-books-grouped-by-genre-response-dto';
import type { SentimentCountResponseDto } from '@app/modules/comment/dto/sentiment-count-response.dto';
import { Controller, Get, Inject } from '@nestjs/common';

import {
  ADMIN_STATISTICS_SERVICES,
  IAdminStatisticsService,
} from './admin-statistics.service.interface';

@Controller('admin-statistics')
export class AdminStatisticsController {
  @Inject(ADMIN_STATISTICS_SERVICES)
  private readonly adminStatisticsService: IAdminStatisticsService;

  @Get('get-total-books-count')
  async getTotalBooksCount(): Promise<number> {
    return this.adminStatisticsService.getTotalBooksCount();
  }

  @Get('get-books-added-this-week')
  async getBooksAddedThisWeekCount(): Promise<number> {
    return this.adminStatisticsService.getBooksAddedThisWeekCount();
  }

  @Get('get-books-count-by-month')
  async getBooksCountByMonth(): Promise<
    GetBooksCountByMonthResponseDto[]
  > {
    return this.adminStatisticsService.getBooksCountByMonth();
  }

  @Get('get-books-grouped-by-genre')
  async getBooksGroupedByGenre(): Promise<
    BooksGroupedByGenreDtoResponse[]
  > {
    return this.adminStatisticsService.getBooksGroupedByGenre();
  }

  @Get('get-comments-count')
  async getTotalCommentsCount(): Promise<number> {
    return this.adminStatisticsService.getTotalCommentsCount();
  }

  @Get('get-comments-added-this-week-count')
  async getTotalCommentsAddedThisWeekCount(): Promise<number> {
    return this.adminStatisticsService.getCommentsAddedThisWeekCount();
  }

  @Get('get-comments-counts-by-sentiments')
  getCommentsCountBySentiment(): Promise<SentimentCountResponseDto[]> {
    return this.adminStatisticsService.getCommentsCountBySentiment();
  }
}
