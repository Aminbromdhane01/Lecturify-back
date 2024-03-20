import { MailService } from "@app/modules/mail/mail.service";
import { MAIL_SERVICE } from "@app/modules/mail/mail.service.interface";

export const mailServiceProvider = {
    provide: MAIL_SERVICE,
    useClass: MailService,
};