import { BookRecommendationController } from '@app/modules/book-recommandation/book-recommandation.controller';
import { BookRecommandationProviders } from '@app/modules/book-recommandation/providers/book-recommandation.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [BookRecommendationController],
  providers: [...BookRecommandationProviders],
})
export class BookRecommandationModule {}
