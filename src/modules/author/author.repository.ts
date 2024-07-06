import { AbstractGenericRepository } from '@app/comon/baserepository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Author } from './author.entity';
import type { CreateAuthorDto } from './dto/create-author.dto';
import type { IAuthorRepository } from './interfaces/author.repository.interface';

@Injectable()
export class AuthorRepository
  extends AbstractGenericRepository<Author>
  implements IAuthorRepository
{
  constructor(private readonly datasource: DataSource) {
    super(datasource, Author);
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.createItem('Author', createAuthorDto);
  }

  async deleteAuthor(id: number): Promise<number> {
    return this.deleteItem('Author', id);
  }

  async getAll(): Promise<Author[]> {
    return this.find();
  }
}
