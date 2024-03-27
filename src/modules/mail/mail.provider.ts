import { MailService } from "@app/modules/mail/mail.service";
import { MAIL_SERVICE } from "@app/modules/mail/mail.service.interface";
import { Provider } from "@nestjs/common";

export const mailProvider: Provider[] = [
    {
        provide: MAIL_SERVICE,
        useClass: MailService,
    }
]

