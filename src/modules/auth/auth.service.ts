import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { IAuthService } from './interfaces/auth.service.interface';
import { signInDto } from './dto/signin-auth.dto';

const AUTH_SERVICE = 'AUTH_SERVICE';
@Injectable()
export class AuthService implements IAuthService {
  signUp(createUserDto: CreateAuthDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
  singIn(signInDto: signInDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
  logOut(id: String): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
