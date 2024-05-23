import {
  BOOK_RECOMMANDATION_SERVIVE,
  IBookRecommandationService,
} from '@app/modules/book-recommandation/book-recommandation.service.interface';
import { Controller, Get, Inject, Query } from '@nestjs/common';

@Controller('recommendation')
export class BookRecommendationController {
  @Inject(BOOK_RECOMMANDATION_SERVIVE)
  private readonly bookRecommendationService: IBookRecommandationService;

  @Get()
  async getRecommendations(@Query('query') query: string[]) {
    return this.bookRecommendationService.getRecommendations(query);
  }
}
