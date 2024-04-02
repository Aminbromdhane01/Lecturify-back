import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IResetMailDto } from '@app/modules/mail/dto/reset-mail.dto';
import type { IMailService } from '@app/modules/mail/mail.service.interface';

@Injectable()
export class MailService implements IMailService {
  @Inject()
  private readonly mailerService: MailerService;

  sendResetmail({ email, username, link }: IResetMailDto): Promise<void> {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      template: '/mail',
      context: {
        username,
        resetLink: link,
      },
    });
  }
}
