import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE } from './interfaces/auth.service.interface';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: AUTH_SERVICE,
    useClass: AuthService
  }

    , UserService, UserRepository],

})
export class AuthModule { }
