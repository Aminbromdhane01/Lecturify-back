import { envConfig } from '@app/config/constantes';
import type { IResetMailDto } from '@app/modules/mail/dto/reset-mail.dto';
export const MAIL_TOKEN = envConfig.MAIL_TOKEN;
export interface IMailService {
  sendResetmail({ username, email, link }: IResetMailDto): Promise<void>;
}
