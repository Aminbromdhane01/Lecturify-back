import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AUTH_SERVICE, IAuthService } from './interfaces/auth.service.interface';
import { signInDto } from './dto/signin-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {

  @Inject(AUTH_SERVICE)
  private readonly authService: IAuthService
  @Post('signin')
  async signIn(signInDto: signInDto): Promise<any> {

    return this.authService.singIn(signInDto)

  }
  @Post('signup')
  async singUp(@Body() singUpDto: CreateUserDto): Promise<any> {

    return this.authService.signUp(singUpDto)
  }
  @Get('logout')
  async logOut(id: string): Promise<any> {
    return this.authService.logOut(id)
  }
}
