import { AbstractGenericRepository } from '@app/comon/baserepository';
import { Comment } from '@app/modules/comment/comment.entity';
import type { CreateCommentDto } from '@app/modules/comment/dto/create-comment.dto';
import type { UpdateCommentDto } from '@app/modules/comment/dto/update-comment.dto';
import type { ICommentRepository } from '@app/modules/comment/interfaces/comment.repository.interface';
import { Injectable } from '@nestjs/common';
import { subWeeks } from 'date-fns';
import { DataSource } from 'typeorm';
@Injectable()
export class CommentRepository
  extends AbstractGenericRepository<Comment>
  implements ICommentRepository
{
  constructor(private readonly datasource: DataSource) {
    super(datasource, Comment);
  }

  async postComment(createCommentdto: CreateCommentDto): Promise<Comment> {
    return this.createItem('Comment', createCommentdto);
  }

  async getBookComments(bookId: number): Promise<Comment[]> {
    return this.createQueryBuilder()
      .where('bookId = :bookId', { bookId })
      .getMany();
  }

  async deleteComment(commentId: number): Promise<number> {
    return this.deleteItem('Comment', commentId);
  }

  async updateComment(
    updateCommentdto: UpdateCommentDto,
    commentId: number,
  ): Promise<Comment | null> {
    return this.updateItem('Comment', commentId, updateCommentdto);
  }

  getCommentsCountBySentiment(): Promise<
    Array<{ sentiment: string; count: number }>
  > {
    return this.createQueryBuilder()
      .select('sentiment')
      .addSelect('COUNT(*)', 'count')
      .groupBy('sentiment')
      .getRawMany();
  }

  async getTotalCommentsCount(): Promise<number> {
    return this.createQueryBuilder('comment').getCount();
  }

  async getCommentsAddedThisWeekCount(): Promise<number> {
    const oneWeekAgo = subWeeks(new Date(), 1);

    return this.createQueryBuilder('comment')
      .where('createAt >= :oneWeekAgo', { oneWeekAgo })
      .getCount();
  }
}
