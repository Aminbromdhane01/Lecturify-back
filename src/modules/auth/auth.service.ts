import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { IAuthService } from './interfaces/auth.service.interface';
import { signInDto } from './dto/signin-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { IUserService, USER_SERVICE } from '../user/interfaces/user.service.interface';
import { hashData } from './helpers/hashdata';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getTokens } from './helpers/getToken';


@Injectable()
export class AuthService implements IAuthService {

  @Inject(USER_SERVICE)
  private readonly userService: IUserService;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService) {

  }


  async signUp(createUserDto: CreateUserDto): Promise<any> {

    const userExists = await this.userService.findUserbyemail(
      createUserDto.email);

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hashData(createUserDto.password);

    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    const tokens = await getTokens(newUser.id, newUser.email, this.jwtService, this.configService);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }
  singIn(signInDto: signInDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
  logOut(id: String): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async updateRefreshToken(id: string, token: string): Promise<any> {
    const hashedRefreshToken = await hashData(token);
    await this.userService.updateUser(id, {
      refreshToken: hashedRefreshToken,
    });
  }

}
