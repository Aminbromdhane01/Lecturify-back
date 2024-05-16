import { envConstants } from '@app/config/constants';
import type { GetBooksCountByMonthResponseDto } from '@app/modules/book/dto/get-books-count-by-month-response-dto';
import type { BooksGroupedByGenreDtoResponse } from '@app/modules/book/dto/get-books-grouped-by-genre-response-dto';
import type { SentimentCountResponseDto } from '@app/modules/comment/dto/sentiment-count-response.dto';

export const ADMIN_STATISTICS_SERVICES =
  envConstants.AdminModule.ADMIN_STATISTICS_SERVICES;

export interface IAdminStatisticsService {
  getTotalBooksCount(): Promise<number>;
  getBooksAddedThisWeekCount(): Promise<number>;
  getBooksGroupedByGenre(): Promise<BooksGroupedByGenreDtoResponse[]>;
  getBooksCountByMonth(): Promise<GetBooksCountByMonthResponseDto[]>;
  getTotalCommentsCount(): Promise<number>;
  getCommentsAddedThisWeekCount(): Promise<number>;
  getCommentsCountBySentiment(): Promise<SentimentCountResponseDto[]>;
}
