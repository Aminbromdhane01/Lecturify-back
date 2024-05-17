import { validationSchema } from '@app/config/env.validation.schema';
import { DataBaseModule } from '@app/database/database.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { MailModule } from '@app/modules/mail/mail.module';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdminDashboardModule } from './modules/admin-statistcs/admin-statistics.module';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { BookModule } from './modules/book/book.module';
import { CommentModule } from './modules/comment/comment.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { SentimentalAnalysisModule } from './modules/sentimental-analysis/sentimental-analysis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    UserModule,
    AuthModule,
    MailModule,
    DataBaseModule,
    BcryptModule,
    BookModule,
    SentimentalAnalysisModule,
    CommentModule,
    AdminDashboardModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
