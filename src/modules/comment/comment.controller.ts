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
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.postComment(createCommentDto);
  }

  @Get('getbybookid/:bookid')
  getByBookId(@Param('bookid') bookId: number): Promise<Comment[]> {
    return this.commentService.getBookComments(bookId);
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

  @Get('/get/group-by-sentiment')
  getCommentsCountBySentiment(): Promise<
    Array<{ sentiment: string; count: number }>
  > {
    return this.commentService.getCommentsCountBySentiment();
  }
}
