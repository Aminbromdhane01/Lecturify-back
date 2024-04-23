import { envConstants } from '@app/config/constants';
import { mailProvider } from '@app/modules/mail/mail.provider';
import { MAIL_SERVICE } from '@app/modules/mail/mail.service.interface';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(
            envConstants.MailModule.MAIL_HOST,
          ),
          port: configService.get<number>(
            envConstants.MailModule.EMAIL_PORT,
          ),
          auth: {
            user: configService.get<string>(
              envConstants.MailModule.USER_EMAIL,
            ),
            pass: configService.get<string>(
              envConstants.MailModule.USER_PASSWORD,
            ),
          },
        },
        defaults: {
          from: configService.get<string>(
            envConstants.MailModule.USER_EMAIL,
          ),
        },
        template: {
          dir: 'src/modules/mail',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [...mailProvider],
  exports: [MAIL_SERVICE],
})
export class MailModule {}
