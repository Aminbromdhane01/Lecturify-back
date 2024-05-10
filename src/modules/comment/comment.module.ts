import { Module } from '@nestjs/common';

import { SentimentalAnalysisModule } from '../sentimental-analysis/sentimental-analysis.module';
import { CommentController } from './comment.controller';
import { COMMENT_REPOSITORY } from './interfaces/comment.repository.interface';
import { COMMENT_SERVICE } from './interfaces/comment.service.interface';
import { commentProviders } from './providers/comment.provider';

@Module({
  imports: [SentimentalAnalysisModule],
  controllers: [CommentController],
  providers: [...commentProviders],
  exports: [COMMENT_SERVICE, COMMENT_REPOSITORY],
})
export class CommentModule {}
