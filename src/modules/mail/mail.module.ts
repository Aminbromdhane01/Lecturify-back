import { envConstants } from '@app/config/constantes';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from '@app/modules/mail/mail.service';
import { MAIL_SERVICE } from '@app/modules/mail/mail.service.interface';
import { mailServiceProvider } from './mail.service.provider';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(envConstants.MailModule.MAIL_HOST),
          port: configService.get<number>(envConstants.MailModule.EMAIL_PORT),
          auth: {
            user: configService.get<string>(envConstants.MailModule.USER_EMAIL),
            pass: configService.get<string>(envConstants.MailModule.USER_PASSWORD),
          },
        },
        defaults: {
          from: configService.get<string>(envConstants.MailModule.USER_EMAIL),
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [
    mailServiceProvider
  ],
  exports: [MAIL_SERVICE],
})
export class MailModule { }
