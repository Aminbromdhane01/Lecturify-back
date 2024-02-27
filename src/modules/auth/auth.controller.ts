import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AUTH_SERVICE, IAuthService } from './interfaces/auth.service.interface';
import { signInDto } from './dto/signin-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor() { }
  @Inject(AUTH_SERVICE)
  private readonly authService: IAuthService

  signIn(signInDto: signInDto): Promise<any> {

    return this.authService.singIn(signInDto)

  }
  singUp(singUpDto: CreateUserDto): Promise<any> {

    return this.authService.signUp(singUpDto)
  }
  logOut(id: string): Promise<any> {
    return this.authService.logOut(id)
  }
}
