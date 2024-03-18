import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { DataBaseModule } from '@app/database/data-source.module';
import { MailModule } from '@app/modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MailModule,
    forwardRef(() => DataBaseModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
