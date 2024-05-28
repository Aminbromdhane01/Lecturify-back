import { envConstants } from '@app/config/constants';
import type { CreateReviewDto } from '@app/modules/review/dto/create.review.dto';
import type { Review } from '@app/modules/review/review.entity';
export const REVIEW_SERVICE = Symbol(
  envConstants.ReviewModule.REVIEW_SERVICE,
);

export interface IReviewService {
  creatReview(CreateReviewDto: CreateReviewDto): Promise<Review | null>;
}
