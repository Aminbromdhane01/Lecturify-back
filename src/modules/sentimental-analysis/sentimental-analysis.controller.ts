import {
  ISentimentalAnlysisService,
  SENTIMENTAL_ANALYSIS_SERVICE,
} from '@app/modules/sentimental-analysis/sentimental-analysis.service.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AnalyseCommenteDto } from './dto/analyse-comment.dto';

@Controller('comments')
export class SentimentAnalysisController {
  @Inject(SENTIMENTAL_ANALYSIS_SERVICE)
  private readonly sentimentAnalysisService: ISentimentalAnlysisService;

  @Post('analyze')
  async analyzeComment(@Body() analysecommentDto: AnalyseCommenteDto) {
    return this.sentimentAnalysisService.analyseComment(
      analysecommentDto.text,
    );
  }

  @Post('analyze-toxicity')
  async analyseToxicity(@Body() analysecommentDto: AnalyseCommenteDto) {
    return this.sentimentAnalysisService.classifyToxicity(
      analysecommentDto.text,
    );
  }
}
