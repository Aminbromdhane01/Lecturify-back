import { envConstants } from '@app/config/constants';
import {
  ESSAY_SERVICE,
  IEssayService,
} from '@app/modules/essay/interfaces/essay.service.interface';
import {
  IMailService,
  MAIL_SERVICE,
} from '@app/modules/mail/mail.service.interface';
import {
  INotificationService,
  NOTIFICATION_SERVICE,
} from '@app/modules/notifications/interfaces/notification.service.interface';
import type { CreateReviewDto } from '@app/modules/review/dto/create.review.dto';
import {
  IReviewRepository,
  REVIEW_REPOSITORY,
} from '@app/modules/review/interfaces/review.repository.interface';
import type { IReviewService } from '@app/modules/review/interfaces/review.service.interface';
import type { Review } from '@app/modules/review/review.entity';
import {
  IUserService,
  USER_SERVICE,
} from '@app/modules/user/interfaces/user.service.interface';
import { Inject } from '@nestjs/common';

export class ReviewService implements IReviewService {
  @Inject(REVIEW_REPOSITORY)
  private readonly reviewRepository: IReviewRepository;

  @Inject(MAIL_SERVICE)
  private readonly mailService: IMailService;

  @Inject(NOTIFICATION_SERVICE)
  private readonly notificationService: INotificationService;

  @Inject(ESSAY_SERVICE)
  private readonly essayService: IEssayService;

  @Inject(USER_SERVICE)
  private readonly userService: IUserService;

  async creatReview(
    createReviewDto: CreateReviewDto,
  ): Promise<Review | null> {
    const review =
      await this.reviewRepository.creatReview(createReviewDto);
    await this.essayService.updateEssay(createReviewDto.essayId, {
      isReviewd: true,
    });

    if (review) {
      const essay = await this.essayService.getEssaybyId(review.essayId);
      await this.notificationService.createNotification({
        userId: essay?.userId as unknown as number,
        content:
          `${envConstants.ReviewModule.NOTIFICATION_MESSAGE_ONE}` +
          `${essay?.title} ${envConstants.ReviewModule.NOTIFOCATION_MESSAGGE_TWO} ${review.rating}`,
      });
      await this.mailService.sendReviewMail({
        username: essay?.user.fullName as string,
        email: essay?.user.email as string,
        comments: createReviewDto.comments,
        score: createReviewDto.rating,
      });
    }

    return review;
  }
}
