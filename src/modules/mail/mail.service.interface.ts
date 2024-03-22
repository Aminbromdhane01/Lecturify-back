import { envConstants } from '@app/config/constants';
import type { IResetMailDto } from '@app/modules/mail/dto/reset-mail.dto';
export const MAIL_SERVICE = envConstants.MailModule.MAIL_TOKEN;
export interface IMailService {
  sendResetmail({ username, email, link }: IResetMailDto): Promise<void>;
}
