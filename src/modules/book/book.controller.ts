import { AccessTokenGuard } from '@app/guards/access-token.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import type { User } from '../user/user.entity';
import type { Book } from './book.entity';
import { AddBookToWishlistDto } from './dto/add-book-to-wishlist.dto';
import { CreateBookDto } from './dto/create.book.dto';
import { GetBooksByPaginationDto } from './dto/get-book-by-pagination.dto';
import { GetBookByUserIdDto } from './dto/get-book-by-userid.dto';
import type { PaginationResponseDto } from './dto/pagination-response.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiItemPerPageQuery,
  ApiKeywordQuery,
  ApiPageQuery,
  ApiSearchByTitleOkResponse,
} from './helpers/swagger-annotations';
import {
  BOOK_SERVICE,
  IBookService,
} from './interfaces/book.service.interface';

@ApiTags('cats')
@Controller('books')
export class BookController {
  @Inject(BOOK_SERVICE) private readonly bookService: IBookService;

  @Post()
  @UseInterceptors(FilesInterceptor('files', 2))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateBookDto,
  })
  async createBook(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book> {
    let image!: Express.Multer.File;
    let pdf!: Express.Multer.File;

    for (const file of files) {
      if (file.mimetype.includes('image')) {
        image = file;
      } else if (file.mimetype.includes('pdf')) {
        pdf = file;
      }
    }

    return this.bookService.createBook(createBookDto, pdf, image);
  }

  @Get()
  async getAll(
    @Query() getBookDto: GetBooksByPaginationDto,
  ): Promise<PaginationResponseDto<Book>> {
    return this.bookService.getAll(getBookDto);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Book | null> {
    return this.bookService.findBookById(id);
  }

  @Delete(':id')
  async deleteByid(@Param('id') id: number): Promise<number> {
    return this.bookService.deleteBook(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 2))
  async updateBook(
    @Param('id') id: number,
    @Body() updatedBook: UpdateBookDto,
    @UploadedFiles() files: Express.Multer.File[] | undefined,
  ): Promise<Book | null> {
    let image!: Express.Multer.File | undefined;
    let pdf!: Express.Multer.File | undefined;

    if (files && files.length > 0) {
      for (const file of files) {
        if (file.mimetype.includes('image')) {
          image = file;
        } else if (file.mimetype.includes('pdf')) {
          pdf = file;
        }
      }
    }

    return this.bookService.updateBook(id, updatedBook, pdf, image);
  }

  @ApiSearchByTitleOkResponse
  @ApiItemPerPageQuery
  @ApiPageQuery
  @ApiKeywordQuery
  @Get('search/title')
  async searchByTitle(
    @Query() getBookDto: GetBooksByPaginationDto,
  ): Promise<PaginationResponseDto<Book>> {
    return this.bookService.findAllByTitle(getBookDto);
  }

  @Post('wishlist')
  async addToWishlist(
    @Body() addToWislistdto: AddBookToWishlistDto,
  ): Promise<User | void> {
    return this.bookService.addBookToWishlist(addToWislistdto);
  }

  @Get('get/userId')
  async getBookbyuserId(
    @Query() { userId }: GetBookByUserIdDto,
  ): Promise<PaginationResponseDto<Book>> {
    return this.bookService.getBooksByUserId(userId);
  }

  @Get('get/recommanded-books')
  async getRecommandedBooks(): Promise<Book[]> {
    return this.bookService.getRecommandedBooks();
  }
}
