import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
const TransformersApi = new Function(
  'return import("@xenova/transformers")',
)();

// eslint-disable-next-line import/no-extraneous-dependencies
import '@tensorflow/tfjs-backend-cpu';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@tensorflow/tfjs-backend-webgl';

import { envConstants } from '@app/config/constants';
import type { AnalyseCommentResponseDto } from '@app/modules/sentimental-analysis/dto/analyse-comment-response.dto';
import type { AnalyseToxicityDto } from '@app/modules/sentimental-analysis/dto/analyse-toxicity-response.dto';
import { StarRating } from '@app/modules/sentimental-analysis/sentiment.enum';
import type { ISentimentalAnlysisService } from '@app/modules/sentimental-analysis/sentimental-analysis.service.interface';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as toxicity from '@tensorflow-models/toxicity';

@Injectable()
export class SentimentAnalysisService
  implements ISentimentalAnlysisService
{
  private model;

  constructor() {
    void this.loadModel();
  }

  private async loadModel() {
    const threshold = envConstants.SentimentAnalysisModule.THRESHOID;

    this.model = await toxicity.load(
      threshold,
      envConstants.CommentModule.TOXICITY_CLASSIFIER_OPTIONS,
    );
  }

  @Inject(ConfigService)
  configService: ConfigService;

  async analyseComment(
    comment: string,
  ): Promise<AnalyseCommentResponseDto> {
    const { pipeline } = await TransformersApi;

    const sentimentAnalyzer = await pipeline('sentiment-analysis');

    const result = await sentimentAnalyzer(comment);

    if ('label' in result[0] && 'score' in result[0]) {
      return {
        sentiment: result[0].label as string,
        score: result[0].score,
      };
    }

    return {
      sentiment: 'unknown',
      score: 0,
    };
  }

  async classifyToxicity(comment: string): Promise<AnalyseToxicityDto> {
    if (!this.model) {
      throw new InternalServerErrorException();
    }

    const prediction = await this.model.classify(comment);
    const filteredData = prediction.map((item) => ({
      label: item.label,
      match: item.results[0].match,
    }));

    return { filteredData } as unknown as AnalyseToxicityDto;
  }

  private mapLabelToSentiment(label: string): string {
    switch (label) {
      case StarRating.OneStar: {
        return envConstants.SentimentAnalysisModule.SENTIMENT_NEGATIVE;
      }

      case StarRating.TwoStar: {
        return envConstants.SentimentAnalysisModule.SENTIMENT_NEGATIVE;
      }

      case StarRating.ThreeStars: {
        return envConstants.SentimentAnalysisModule.SENTIMENT_NEUTRAL;
      }

      case StarRating.FourStars: {
        return envConstants.SentimentAnalysisModule.SENTIMENT_POSITIVE;
      }

      case StarRating.FiveStars: {
        return envConstants.SentimentAnalysisModule.SENTIMENT_POSITIVE;
      }

      default: {
        return StarRating.Unknown;
      }
    }
  }
}
