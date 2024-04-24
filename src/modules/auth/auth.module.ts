import { AuthController } from '@app/modules/auth/auth.controller';
import { authProviders } from '@app/modules/auth/providers/auth.provider';
import { BcryptModule } from '@app/modules/bcrypt/bcrypt.module';
import { MailModule } from '@app/modules/mail/mail.module';
import { RefreshTokenStrategy } from '@app/modules/passport/refresh-token.strategy';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AccessTokenStrategy } from '../passport/acces-token.strategy';

@Module({
  imports: [UserModule, MailModule, JwtModule.register({}), BcryptModule],
  controllers: [AuthController],
  providers: [...authProviders, RefreshTokenStrategy, AccessTokenStrategy],
})
export class AuthModule {}
