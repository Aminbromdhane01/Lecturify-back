import { envConstants } from '@app/config/constants';
import { AbusiveCommentException } from '@app/exceptions/AbusiveCommentException';
import type { Comment } from '@app/modules/comment/comment.entity';
import type { CreateCommentDto } from '@app/modules/comment/dto/create-comment.dto';
import type { SentimentCountResponseDto } from '@app/modules/comment/dto/sentiment-count-response.dto';
import type { UpdateCommentDto } from '@app/modules/comment/dto/update-comment.dto';
import {
  COMMENT_REPOSITORY,
  ICommentRepository,
} from '@app/modules/comment/interfaces/comment.repository.interface';
import type { ICommentService } from '@app/modules/comment/interfaces/comment.service.interface';
import {
  ISentimentalAnlysisService,
  SENTIMENTAL_ANALYSIS_SERVICE,
} from '@app/modules/sentimental-analysis/sentimental-analysis.service.interface';
import { Inject } from '@nestjs/common';

export class CommentService implements ICommentService {
  @Inject(COMMENT_REPOSITORY)
  private readonly commentRepository: ICommentRepository;

  @Inject(SENTIMENTAL_ANALYSIS_SERVICE)
  private readonly sentimentalAnalysisService: ISentimentalAnlysisService;

  async postComment(createCommentdto: CreateCommentDto): Promise<Comment> {
    const commentResult =
      await this.sentimentalAnalysisService.classifyToxicity(
        createCommentdto.text,
      );

    const isCommentToxic = commentResult.filteredData.some(
      (data) => data.match !== false,
    );

    if (isCommentToxic) {
      throw new AbusiveCommentException();
    }

    const analyseComment =
      await this.sentimentalAnalysisService.analyseComment(
        createCommentdto.text,
      );

    createCommentdto.sentiment = analyseComment.sentiment;

    return this.commentRepository.postComment(createCommentdto);
  }

  async getBookComments(bookId: number): Promise<Comment[]> {
    return this.commentRepository.getBookComments(bookId);
  }

  async deleteComment(commentId: number): Promise<number> {
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

  async getCommentsCountBySentiment(): Promise<
    SentimentCountResponseDto[]
  > {
    return this.commentRepository.getCommentsCountBySentiment();
  }

  async getTotalCommentsCount(): Promise<number> {
    return this.commentRepository.getTotalCommentsCount();
  }

  async getCommentsAddedThisWeekCount(): Promise<number> {
    return this.commentRepository.getCommentsAddedThisWeekCount();
  }
}
