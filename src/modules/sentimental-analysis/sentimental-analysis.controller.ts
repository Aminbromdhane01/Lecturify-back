import {
  ISentimentalAnlysisService,
  SENTIMENTAL_ANALYSIS_SERVICE,
} from '@app/modules/sentimental-analysis/sentimental-analysis.service.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('comments')
export class SentimentAnalysisController {
  @Inject(SENTIMENTAL_ANALYSIS_SERVICE)
  private readonly sentimentAnalysisService: ISentimentalAnlysisService;

  @Post('analyze')
  async analyzeComment(@Body() body: { comment: string }) {
    const { comment } = body;

    return this.sentimentAnalysisService.analyseComment(comment);
  }

  @Post('analyze-toxicity')
  async analyseToxicity(@Body() body: { comment: string }) {
    const { comment } = body;

    return this.sentimentAnalysisService.classifyToxicity(comment);
  }
}
