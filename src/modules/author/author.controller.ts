import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

import type { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import {
  AUTHOR_SERVICE,
  IAuthorService,
} from './interfaces/author.service.interface';

@Controller('authors')
export class AuthorController {
  @Inject(AUTHOR_SERVICE)
  private readonly authorService: IAuthorService;

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: number): Promise<number> {
    return this.authorService.deleteAuthor(id);
  }

  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return this.authorService.getAllAuthors();
  }
}
