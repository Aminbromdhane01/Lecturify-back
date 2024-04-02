import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { DataBaseModule } from '@app/database/database.module';
import { MailModule } from '@app/modules/mail/mail.module';
import * as Joi from '@hapi/joi';
import { validationSchema } from '@app/config/env.validation.schema';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema
    }),
    UserModule,
    AuthModule,
    MailModule,
    DataBaseModule,
    BcryptModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
