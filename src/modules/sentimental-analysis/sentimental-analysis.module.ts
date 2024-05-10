import { Module } from '@nestjs/common';

import { SentimentalAnlysisProviders } from './providers/sentimental-analysis.provider';
import { SentimentAnalysisController } from './sentimental-analysis.controller';
import { SENTIMENTAL_ANALYSIS_SERVICE } from './sentimental-analysis.service.interface';

@Module({
  controllers: [SentimentAnalysisController],
  providers: [...SentimentalAnlysisProviders],
  exports: [SENTIMENTAL_ANALYSIS_SERVICE],
})
export class SentimentalAnalysisModule {}
