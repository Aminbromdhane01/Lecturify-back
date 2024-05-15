import { envConstants } from '@app/config/constants';
import type { Comment } from '@app/modules/comment/comment.entity';
import type { CreateCommentDto } from '@app/modules/comment/dto/create-comment.dto';
import type { UpdateCommentDto } from '@app/modules/comment/dto/update-comment.dto';

export const COMMENT_SERVICE = envConstants.CommentModule.COMMENT_SERVICE;
export interface ICommentService {
  postComment(createCommentdto: CreateCommentDto): Promise<Comment>;
  getBookComments(bookId: number): Promise<Comment[]>;
  deleteComment(commentId: number): Promise<number>;
  updateComment(
    updateCommentdto: UpdateCommentDto,
    commentId: number,
  ): Promise<Comment | null>;
  getCommentsCountBySentiment(): Promise<
    Array<{ sentiment: string; count: number }>
  >;
  getTotalCommentsCount(): Promise<number>;
  getCommentsAddedThisWeekCount(): Promise<number>;
}
