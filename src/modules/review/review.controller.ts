import { CreateReviewDto } from '@app/modules/review/dto/create.review.dto';
import {
  IReviewService,
  REVIEW_SERVICE,
} from '@app/modules/review/interfaces/review.service.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('review')
export class ReviewController {
  @Inject(REVIEW_SERVICE)
  private readonly reviewService: IReviewService;

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.creatReview(createReviewDto);
  }
}
