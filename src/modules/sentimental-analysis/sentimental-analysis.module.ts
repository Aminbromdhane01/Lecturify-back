import { SentimentalAnlysisProviders } from '@app/modules/sentimental-analysis/providers/sentimental-analysis.provider';
import { SentimentAnalysisController } from '@app/modules/sentimental-analysis/sentimental-analysis.controller';
import { SENTIMENTAL_ANALYSIS_SERVICE } from '@app/modules/sentimental-analysis/sentimental-analysis.service.interface';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SentimentAnalysisController],
  providers: [...SentimentalAnlysisProviders],
  exports: [SENTIMENTAL_ANALYSIS_SERVICE],
})
export class SentimentalAnalysisModule {}
