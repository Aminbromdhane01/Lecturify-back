import { Module } from '@nestjs/common';
import { AuthController } from '@app/modules/auth/auth.controller';
import { UserModule } from '@app/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@app/modules/mail/mail.module';
import { authProviders } from '@app/modules/auth/providers/auth.provider';
import { BcryptModule } from '@app/modules/bcrypt/bcrypt.module';
import { AccessTokenStrategy } from '@app/modules/passport/accesToken.strategy';
import { RefreshTokenStrategy } from '@app/modules/passport/refreshToken.strategy';

@Module({
  imports: [UserModule, MailModule, JwtModule.register({}), BcryptModule],
  controllers: [AuthController],
  providers: [
    ...authProviders, RefreshTokenStrategy, AccessTokenStrategy
  ],
})
export class AuthModule { }
