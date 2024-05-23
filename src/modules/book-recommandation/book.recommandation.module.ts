import { BookRecommendationController } from '@app/modules/book-recommandation/book-recommandation.controller';
import { BookRecommandationProviders } from '@app/modules/book-recommandation/providers/book-recommandation.provider';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [BookRecommendationController],
  providers: [...BookRecommandationProviders],
})
export class BookRecommandationModule {}
