import { Body, Controller, Inject, Post } from '@nestjs/common';

import {
  ISentimentalAnlysisService,
  SENTIMENTAL_ANALYSIS_SERVICE,
} from './sentimental-analysis.service.interface';

@Controller('comments')
export class SentimentAnalysisController {
  @Inject(SENTIMENTAL_ANALYSIS_SERVICE)
  private readonly sentimentAnalysisService: ISentimentalAnlysisService;

  @Post('analyze')
  async analyzeComment(@Body() body: { comment: string }) {
    const { comment } = body;

    return this.sentimentAnalysisService.analyseComment(comment);
  }
}
