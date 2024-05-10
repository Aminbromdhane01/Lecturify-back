import { envConstants } from '@app/config/constants';

import type { Comment } from '../comment.entity';
import type { CreateCommentDto } from '../dto/create-comment.dto';
import type { UpdateCommentDto } from '../dto/update-comment.dto';
export const COMMENT_REPOSITORY =
  envConstants.CommentModule.COMMENT_REPOSITORY;
export interface ICommentRepository {
  postComment(createCommentdto: CreateCommentDto): Promise<Comment>;
  getBookComments(bookId: number): Promise<Comment[]>;
  deleteComment(commentId: number): Promise<number>;
  updateComment(
    updateCommentdto: UpdateCommentDto,
    commentId: number,
  ): Promise<Comment | null>;
}
