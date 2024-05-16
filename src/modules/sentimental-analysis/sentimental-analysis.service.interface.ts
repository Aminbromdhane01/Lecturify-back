import { envConstants } from '@app/config/constants';
import type { AnalyseCommentResponseDto } from '@app/modules/sentimental-analysis/dto/analyse-comment-response.dto';
import type { AnalyseToxicityDto } from '@app/modules/sentimental-analysis/dto/analyse-toxicity-response.dto';
export const SENTIMENTAL_ANALYSIS_SERVICE =
  envConstants.SentimentAnalysisModule.SENTIMENTAL_ANALYSIS_SERVICE;
export interface ISentimentalAnlysisService {
  analyseComment(comment: string): Promise<AnalyseCommentResponseDto>;
  classifyToxicity(comment: string): Promise<AnalyseToxicityDto>;
}
