import { AbstractGenericRepository } from '@app/comon/baserepository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Comment } from './comment.entity';
import type { CreateCommentDto } from './dto/create-comment.dto';
import type { UpdateCommentDto } from './dto/update-comment.dto';
import type { ICommentRepository } from './interfaces/comment.repository.interface';
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
}
