import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from '@app/modules/auth/interfaces/auth.service.interface';
import { SignInDto } from '@app/modules/auth/dto/signin-auth.dto';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import {
  IUserService,
  USER_SERVICE,
} from '@app/modules/user/interfaces/user.service.interface';
import { hashData } from '@app/modules/auth/helpers/HashData';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getTokens } from '@app/modules/auth/helpers/GetToken';
import { comparePasswords } from '@app/modules/auth/helpers/ComparePasswords';
import { User } from '@app/modules/user/user.entity';
import { envConstants } from '@app/config/constants';
import {
  IMailService,
  MAIL_SERVICE,
} from '@app/modules/mail/mail.service.interface';
import { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import { UserAlreadyExitsException } from '@app/exceptions/UserAlreadyExistsException';
import { InvalidEmailOrPasswordExeption } from '@app/exceptions/InvalidEmailOrPasswordException';
import { AccessDeniedExeption } from '@app/exceptions/AccessDeniedExeption';
import { UserNotFoundException } from '@app/exceptions/UserNotFoundExeption';
import { BCRYPT_SERVICE, IBcryptService } from '../bcrypt/bcrypt.service.interface';

@Injectable()
export class AuthService implements IAuthService {


  @Inject(USER_SERVICE)
  private readonly userService: IUserService;
  @Inject(MAIL_SERVICE)
  private readonly mailService: IMailService;
  @Inject(BCRYPT_SERVICE)
  private readonly bcryptService: IBcryptService;
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(ConfigService)
  private configService: ConfigService;
  async resetPassword({ token, password, confirmPassword, }: ResetPasswordDto): Promise<User> {
    /*if (password != confirmPassword) {
      throw new PasswordDoNotMatchException()
    }*/

    const user = await this.userService.findUserbyToken(token);


    const hashedPassword = await hashData(password);
    return this.userService.updateUser(user.id, { password: hashedPassword });
  }
  async forgetPassword(email: string): Promise<void> {
    const user = await this.userService.findUserbyemail(email);
    const expiresIn = this.configService.get(envConstants.AuthModule.RESET_TOKEN_EXPIRE_IN)
    const secretKey = this.configService.get(envConstants.AuthModule.RESET_TOKEN_SECRET_KEY)
    const token = this.jwtService.sign({ email }, { expiresIn, secret: secretKey });
    if (!user) {
      throw new UserNotFoundException()
    }
    const upadatedUser = await this.userService.updateUser(user.id, {
      resetPasswordToken: token,
    });

    const resetUrl =
      this.configService.get(envConstants.MailModule.RESET_PASSWORD_URL) + token;

    return this.mailService.sendResetmail({
      username: upadatedUser.firstname,
      email: upadatedUser.email,
      link: resetUrl,
    });
  }

  async validateUser({ email, password }: SignInDto): Promise<User | undefined> {
    const user = await this.userService.findUserbyemail(email);
    if (user && await comparePasswords(user.password, password)) {
      return user;
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<SignInResponseDto> {

    let userExists;
    try {
      userExists = await this.userService.findUserbyemail(createUserDto.email);
      console.log(userExists);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        userExists = false;
      }
    }

    console.log(userExists);

    if (userExists) {
      throw new UserAlreadyExitsException()
    }
    const saltRounds = await this.configService.get(envConstants.Bcrypt.SALT_ROUNDS)


    const hashedPassword = await this.bcryptService.hashData(createUserDto.password, saltRounds)

    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    if (!newUser) {

      throw new NotFoundException()
    }

    const tokens = await getTokens(
      newUser.id,
      newUser.email,
      this.jwtService,
      this.configService,
    );
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;




  }
  async singIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    console.log(signInDto.email);

    const user = await this.userService.findUserbyemail(signInDto.email);
    console.log(user);


    if (!user) {
      throw new InvalidEmailOrPasswordExeption()
    }


    const passwordMatches = await this.bcryptService.comparePasswords(signInDto.password, user.password);
    console.log(passwordMatches);

    if (!passwordMatches) {
      throw new InvalidEmailOrPasswordExeption()
    }
    const tokens = await getTokens(
      user.id,
      user.email,
      this.jwtService,
      this.configService,
    );

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  async logOut(id: string): Promise<User> {
    return await this.userService.updateUser(id, { refreshToken: undefined });
  }
  async updateRefreshToken(id: string, token: string): Promise<User> {
    const hashedRefreshToken = await hashData(token);
    return await this.userService.updateUser(id, {
      refreshToken: hashedRefreshToken,
    });
  }
  async refreshTokens(id: string, token: string): Promise<SignInResponseDto> {
    const user = await this.userService.findUserbyid(id);
    if (!user || !user.refreshToken)
      throw new AccessDeniedExeption()
    const refreshTokenMatches = comparePasswords(user.refreshToken, token);

    if (!refreshTokenMatches)
      throw new AccessDeniedExeption()
    const tokens = await getTokens(
      user.id,
      user.email,
      this.jwtService,
      this.configService,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
