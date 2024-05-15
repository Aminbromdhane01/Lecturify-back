import { CommentController } from '@app/modules/comment/comment.controller';
import { COMMENT_REPOSITORY } from '@app/modules/comment/interfaces/comment.repository.interface';
import { COMMENT_SERVICE } from '@app/modules/comment/interfaces/comment.service.interface';
import { commentProviders } from '@app/modules/comment/providers/comment.provider';
import { SentimentalAnalysisModule } from '@app/modules/sentimental-analysis/sentimental-analysis.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SentimentalAnalysisModule],
  controllers: [CommentController],
  providers: [...commentProviders],
  exports: [COMMENT_SERVICE, COMMENT_REPOSITORY],
})
export class CommentModule {}
