import { REVIEW_REPOSITORY } from '@app/modules/review/interfaces/review.repository.interface';
import { REVIEW_SERVICE } from '@app/modules/review/interfaces/review.service.interface';
import { ReviewRepository } from '@app/modules/review/review.repository';
import { ReviewService } from '@app/modules/review/review.service';
import type { Provider } from '@nestjs/common';

const reviewProviders: Provider[] = [
  {
    provide: REVIEW_SERVICE,
    useClass: ReviewService,
  },
  {
    provide: REVIEW_REPOSITORY,
    useClass: ReviewRepository,
  },
];

export { reviewProviders };
