import { Module } from '@nestjs/common';
import { AuthController } from '@app/modules/auth/auth.controller';
import { UserModule } from '@app/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@app/modules/mail/mail.module';
import { authServiceProvider } from './auth.service.provider';
import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [UserModule, MailModule, JwtModule.register({}), BcryptModule],
  controllers: [AuthController],
  providers: [
    authServiceProvider

  ],
})
export class AuthModule { }
