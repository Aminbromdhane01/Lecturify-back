import { envConstants } from '@app/config/constants';
import { AbusiveCommentException } from '@app/exceptions/AbusiveCommentException';
import { Inject } from '@nestjs/common';

import {
  ISentimentalAnlysisService,
  SENTIMENTAL_ANALYSIS_SERVICE,
} from '../sentimental-analysis/sentimental-analysis.service.interface';
import type { Comment } from './comment.entity';
import type { CreateCommentDto } from './dto/create-comment.dto';
import type { UpdateCommentDto } from './dto/update-comment.dto';
import {
  COMMENT_REPOSITORY,
  ICommentRepository,
} from './interfaces/comment.repository.interface';
import type { ICommentService } from './interfaces/comment.service.interface';

export class CommentService implements ICommentService {
  @Inject(COMMENT_REPOSITORY)
  private readonly commentRepository: ICommentRepository;

  @Inject(SENTIMENTAL_ANALYSIS_SERVICE)
  private readonly sentimentalAnalysisService: ISentimentalAnlysisService;

  async postComment(createCommentdto: CreateCommentDto): Promise<Comment> {
    const commentResult =
      await this.sentimentalAnalysisService.analyseComment(
        createCommentdto.text,
      );

    if (
      commentResult.sentiment ===
      envConstants.SentimentAnalysisModule.SENTIMENT_ABUSIVE
    ) {
      throw new AbusiveCommentException();
    }

    createCommentdto.sentiment = commentResult.sentiment;

    return this.commentRepository.postComment(createCommentdto);
  }

  getCommentbyBookId(bookId: number): Promise<Comment[]> {
    return this.commentRepository.getCommentbyBookId(bookId);
  }

  deleteComment(commentId: number): Promise<number> {
    return this.commentRepository.deleteComment(commentId);
  }

  async updateComment(
    updateCommentdto: UpdateCommentDto,
    commentId: number,
  ): Promise<Comment | null> {
    const commentResult =
      await this.sentimentalAnalysisService.analyseComment(
        updateCommentdto.text as string,
      );

    if (
      commentResult.sentiment ===
      envConstants.SentimentAnalysisModule.SENTIMENT_ABUSIVE
    ) {
      throw new AbusiveCommentException();
    }

    updateCommentdto.sentiment = commentResult.sentiment;

    return this.commentRepository.updateComment(
      updateCommentdto,
      commentId,
    );
  }
}
