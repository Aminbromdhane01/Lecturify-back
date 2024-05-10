import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UpdateBookDto } from '../book/dto/update-book.dto';
import type { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  COMMENT_SERVICE,
  ICommentService,
} from './interfaces/comment.service.interface';

@Controller('comment')
export class CommentController {
  @Inject(COMMENT_SERVICE)
  private readonly commentService: ICommentService;

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.postComment(createCommentDto);
  }

  @Get('getbybookid/:bookid')
  getByBookId(@Param('bookid') bookId: number): Promise<Comment[]> {
    return this.commentService.getCommentbyBookId(bookId);
  }

  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: number): Promise<number> {
    return this.commentService.deleteComment(commentId);
  }

  @Patch(':commentId')
  updateComment(
    @Param('commentId') commentId: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Comment | null> {
    return this.commentService.updateComment(updateBookDto, commentId);
  }
}
