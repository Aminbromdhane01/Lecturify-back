import { Controller, Get, Post, Body, Inject, ValidationPipe, UsePipes, Patch, Put } from '@nestjs/common';
import {
  AUTH_SERVICE,
  IAuthService,
} from '@app/modules/auth/interfaces/auth.service.interface';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import { User } from '@app/modules/user/user.entity';
import { SignInDto } from '@app/modules/auth/dto/signin-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  @Inject(AUTH_SERVICE)
  private readonly authService: IAuthService;
  @Post('singin')
  async signIn(@Body() signInCredentials: SignInDto): Promise<SignInResponseDto> {
    return this.authService.singIn(signInCredentials);
  }
  @UsePipes(ValidationPipe)
  @Post('signup')
  async singUp(@Body() singUpDto: SignUpDto): Promise<SignInResponseDto> {
    return this.authService.signUp(singUpDto);
  }
  @Post('forget-password')
  async forgetPassword(@Body() email: string): Promise<void> {
    return this.authService.forgetPassword(email);
  }
  @UsePipes(ValidationPipe)
  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<User> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
