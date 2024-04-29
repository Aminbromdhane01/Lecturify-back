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
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import type { Book } from './book.entity';
import { CreateBookDto } from './dto/create.book.dto';
import { GetBooksByPaginationDto } from './dto/get-book-by-pagination.dto';
import { UpdateBookDto } from './dto/update-book.dto';
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
  ): Promise<{ data: Book[]; count: number }> {
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

  @Get('search/title')
  async searchByTitle(
    @Query() getBookDto: GetBooksByPaginationDto,
  ): Promise<{ data: Book[]; count: number }> {
    return this.bookService.findAllByTitle(getBookDto);
  }
}
