import { envConfig } from '@app/config/constantes';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from '@app/modules/mail/mail.service';
import { MAIL_TOKEN } from '@app/modules/mail/mail.service.interface';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(envConfig.MAIL_HOST),
          port: 587,
          auth: {
            user: configService.get<string>(envConfig.USER_EMAIL),
            pass: configService.get<string>(envConfig.USER_PASSWORD),
          },
        },
        defaults: {
          from: configService.get<string>(envConfig.USER_EMAIL),
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
    MailService,
    {
      provide: MAIL_TOKEN,
      useClass: MailService,
    },
  ],
  exports: [MAIL_TOKEN],
})
export class MailModule {}
