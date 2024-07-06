import { Inject, Injectable } from '@nestjs/common';

import type { Author } from './author.entity';
import type { CreateAuthorDto } from './dto/create-author.dto';
import {
  AUTHOR_REPOSITORY,
  IAuthorRepository,
} from './interfaces/author.repository.interface';

@Injectable()
export class AuthorService {
  constructor(
    @Inject(AUTHOR_REPOSITORY)
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createAuthor(createAuthorDto);
  }

  async deleteAuthor(id: number): Promise<number> {
    return this.authorRepository.deleteAuthor(id);
  }

  async getAllAuthors(): Promise<Author[]> {
    return this.authorRepository.getAll();
  }
}
