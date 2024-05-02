import { Inject, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
const TransformersApi = new Function(
  'return import("@xenova/transformers")',
)();

import { envConstants } from '@app/config/constants';
import { ConfigService } from '@nestjs/config';

import type { AnalyseCommentResponseDto } from './dto/analyse-comment-response.dto';
import type { ISentimentalAnlysisService } from './sentimental-analysis.service.interface';

@Injectable()
export class SentimentAnalysisService
  implements ISentimentalAnlysisService
{
  @Inject(ConfigService)
  configService: ConfigService;

  async analyseComment(
    comment: string,
  ): Promise<AnalyseCommentResponseDto> {
    const { pipeline } = await TransformersApi;

    const sentimentAnalyzer = await pipeline(
      this.configService.get<string>(
        envConstants.SentimentAnalysisModule.ANALYSIS_TYPE,
      ),
      this.configService.get<string>(
        envConstants.SentimentAnalysisModule.MODEL_IDENTIFIER,
      ),
    );

    const result = await sentimentAnalyzer(comment);

    if ('label' in result[0] && 'score' in result[0]) {
      return {
        sentiment: this.mapLabelToSentiment(result[0].label as string),
        score: result[0].score,
      };
    }

    return {
      sentiment: 'unknown',
      score: 0,
    };
  }

  private mapLabelToSentiment(label: string): string {
    switch (label) {
      case '1 star': {
        return envConstants.SentimentAnalysisModule.SENTIMENT_ABUSIVE;
      }

      case '2 star': {
        return envConstants.SentimentAnalysisModule.SENTIMENT_NEGATIVE;
      }

      case '3 stars': {
        return envConstants.SentimentAnalysisModule.SENTIMENT_NEUTRAL;
      }

      case '4 stars': {
        return envConstants.SentimentAnalysisModule.SENTIMENT_POSITIVE;
      }

      case '5 stars': {
        return envConstants.SentimentAnalysisModule.SENTIMENT_POSITIVE;
      }

      default: {
        return 'unknown';
      }
    }
  }
}
