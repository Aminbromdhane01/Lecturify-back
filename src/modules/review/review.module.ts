import { EssayModule } from '@app/modules/essay/essay.module';
import { MailModule } from '@app/modules/mail/mail.module';
import { NotificationModule } from '@app/modules/notifications/notification.module';
import { REVIEW_REPOSITORY } from '@app/modules/review/interfaces/review.repository.interface';
import { REVIEW_SERVICE } from '@app/modules/review/interfaces/review.service.interface';
import { reviewProviders } from '@app/modules/review/providers/review.providers';
import { ReviewController } from '@app/modules/review/review.controller';
import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

@Module({
  imports: [EssayModule, NotificationModule, MailModule, UserModule],
  controllers: [ReviewController],
  providers: [...reviewProviders],
  exports: [REVIEW_SERVICE, REVIEW_REPOSITORY],
})
export class ReviewModule {}
