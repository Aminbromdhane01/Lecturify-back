import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import {
  AUTH_SERVICE,
  IAuthService,
} from '@app/modules/auth/interfaces/auth.service.interface';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import { User } from '@app/modules/user/user.entity';
import { signInDto } from '@app/modules/auth/dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  @Inject(AUTH_SERVICE)
  private readonly authService: IAuthService;
  @Post('signin')
  async signIn(signInCredentials: signInDto): Promise<SignInResponseDto> {
    return this.authService.singIn(signInCredentials);
  }
  @Post('signup')
  async singUp(@Body() singUpDto: CreateUserDto): Promise<SignInResponseDto> {
    return this.authService.signUp(singUpDto);
  }
  @Get('logout')
  async logOut(id: string): Promise<User> {
    return this.authService.logOut(id);
  }
  @Post('forget-password')
  async forgetPassword(email: string): Promise<void> {
    return this.authService.forgetPassword(email);
  }
}
