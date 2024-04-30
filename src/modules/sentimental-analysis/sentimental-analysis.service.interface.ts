import type { AnalyseCommentResponseDto } from './dto/analyse-comment-response.dto';
export const SENTIMENTAL_ANALYSIS_SERVICE = 'SENTIMENTAL_ANALYSIS_SERVICE';
export interface ISentimentalAnlysisService {
  analyseComment(
    comment: string,
  ): Promise<void | AnalyseCommentResponseDto>;
}
