import { Module } from '@nestjs/common';
import { AuthService } from '@app/modules/auth/auth.service';
import { AuthController } from '@app/modules/auth/auth.controller';
import { UserModule } from '@app/modules/user/user.module';
import { UserService } from '@app/modules/user/user.service';
import { UserRepository } from '@app/modules/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE } from '@app/modules/auth/interfaces/auth.service.interface';
import { MailModule } from '@app/modules/mail/mail.module';
import { MailService } from '@app/modules/mail/mail.service';

@Module({
  imports: [UserModule, MailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },

  ],
})
export class AuthModule { }
