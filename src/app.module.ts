import { validationSchema } from '@app/config/env.validation.schema';
import { DataBaseModule } from '@app/database/database.module';
import { AdminDashboardModule } from '@app/modules/admin-statistcs/admin-statistics.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { BcryptModule } from '@app/modules/bcrypt/bcrypt.module';
import { BookModule } from '@app/modules/book/book.module';
import { BookRecommandationModule } from '@app/modules/book-recommandation/book.recommandation.module';
import { CommentModule } from '@app/modules/comment/comment.module';
import { EssayModule } from '@app/modules/essay/essay.module';
import { MailModule } from '@app/modules/mail/mail.module';
import { NotificationModule } from '@app/modules/notifications/notification.module';
import { ReviewModule } from '@app/modules/review/review.module';
import { SentimentalAnalysisModule } from '@app/modules/sentimental-analysis/sentimental-analysis.module';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
    BookRecommandationModule,
    EssayModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
