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
import { comparePasswords } from './helpers/comparePasswords';
import { User } from '../user/user.entity';


@Injectable()
export class AuthService implements IAuthService {

  @Inject(USER_SERVICE)
  private readonly userService: IUserService;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService) {

  }
  async validateUser({ email, password }: signInDto): Promise<User> {
    const user = await this.userService.findUserbyemail(email);
    if (user && comparePasswords(user.password, password)) {
      return user
    }
  }


  async signUp(createUserDto: CreateUserDto): Promise<any> {

    const userExists = await this.userService.findUserbyemail(
      createUserDto.email);
    console.log(userExists);


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
  async singIn(signInDto: signInDto): Promise<any> {
    const user = await this.userService.findUserbyemail(signInDto.email)

    if (!user) {
      throw new HttpException('Invalid email or password ', HttpStatus.BAD_REQUEST)
    }
    const passwordMatches = await comparePasswords(user.password, signInDto.password)
    if (!passwordMatches) {
      throw new HttpException('Invalid email or password ', HttpStatus.BAD_REQUEST)
    }
    const tokens = await getTokens(user.id, user.email, this.jwtService, this.configService);

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;

  }
  logOut(id: string): Promise<any> {
    return this.userService.updateUser(id, { refreshToken: null });
  }
  async updateRefreshToken(id: string, token: string): Promise<any> {
    const hashedRefreshToken = await hashData(token);
    await this.userService.updateUser(id, {
      refreshToken: hashedRefreshToken,
    });
  }
  async RefreshTokens(id: string, token: string): Promise<any> {
    const user = await this.userService.findUserbyid(id);
    if (!user || !user.refreshToken)
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    const refreshTokenMatches = comparePasswords(user.refreshToken, token)

    if (!refreshTokenMatches) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    const tokens = await getTokens(user.id, user.email, this.jwtService, this.configService);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }


}
