import { Module } from '@nestjs/common';

import { SentimentalAnlysisProviders } from './providers/sentimental-analysis.provider';
import { SentimentAnalysisController } from './sentimental-analysis.controller';

@Module({
  controllers: [SentimentAnalysisController],
  providers: [...SentimentalAnlysisProviders],
})
export class SentimentalAnalysisModule {}
