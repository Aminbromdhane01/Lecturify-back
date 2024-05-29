import { AbstractGenericRepository } from '@app/comon/baserepository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import type { CreateReviewDto } from './dto/create.review.dto';
import type { IReviewRepository } from './interfaces/review.repository.interface';
import { Review } from './review.entity';
@Injectable()
export class ReviewRepository
  extends AbstractGenericRepository<Review>
  implements IReviewRepository
{
  constructor(private readonly datasource: DataSource) {
    super(datasource, Review);
  }

  async creatReview(
    CreateReviewDto: CreateReviewDto,
  ): Promise<Review | null> {
    const newItem = await this.createQueryBuilder()
      .insert()
      .values(CreateReviewDto)
      .execute();

    return this.findOne({ where: { id: newItem.identifiers[0].id } });
  }
}
