import { envConstants } from '@app/config/constants';
import type { IResetMailDto } from '@app/modules/mail/dto/reset-mail.dto';
import type { IMailService } from '@app/modules/mail/mail.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IReviewMailDto } from './dto/review-mail.dto';

@Injectable()
export class MailService implements IMailService {
  @Inject()
  private readonly mailerService: MailerService;

  sendResetmail({ email, username, link }: IResetMailDto): Promise<void> {
    return this.mailerService.sendMail({
      to: email,
      subject: envConstants.MailModule.RESET_PASSWORD_EMAIL_SUBJECT,
      template: envConstants.MailModule.RESET_PASSWORD_EMAIL_TEMPLATE,
      context: {
        username,
        resetLink: link,
      },
    });
  }

  sendReviewMail({
    username,
    email,
    comments,
    score,
  }: IReviewMailDto): Promise<void> {
    return this.mailerService.sendMail({
      to: email,
      subject: envConstants.MailModule.REVIEW_EMAIL_SUBJECT,
      template: envConstants.MailModule.REVIEW_EMAIL_TEMPLATE,
      context: {
        username,
        comments,
        score,
      },
    });
  }
}
