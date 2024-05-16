import { UpdateBookDto } from '@app/modules/book/dto/update-book.dto';
import type { Comment } from '@app/modules/comment/comment.entity';
import { CreateCommentDto } from '@app/modules/comment/dto/create-comment.dto';
import {
  COMMENT_SERVICE,
  ICommentService,
} from '@app/modules/comment/interfaces/comment.service.interface';
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

@Controller('comment')
export class CommentController {
  @Inject(COMMENT_SERVICE)
  private readonly commentService: ICommentService;

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.postComment(createCommentDto);
  }

  @Get('getbybookid/:bookid')
  async getByBookId(@Param('bookid') bookId: number): Promise<Comment[]> {
    return this.commentService.getBookComments(bookId);
  }

  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
  ): Promise<number> {
    return this.commentService.deleteComment(commentId);
  }

  @Patch(':commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Comment | null> {
    return this.commentService.updateComment(updateBookDto, commentId);
  }
}
