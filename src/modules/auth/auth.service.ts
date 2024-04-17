import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from '@app/modules/auth/interfaces/auth.service.interface';
import { SignInDto } from '@app/modules/auth/dto/signin-auth.dto';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import {
  IUserService,
  USER_SERVICE,
} from '@app/modules/user/interfaces/user.service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getTokens } from '@app/modules/auth/helpers/GetToken';
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
import { BCRYPT_SERVICE, IBcryptService } from '@app/modules/bcrypt/bcrypt.service.interface';
import { ForgetPasswordResponseDto } from '@app/modules/auth/dto/forget-password-response.dto';
import { RefreshTokeneResponseDto } from './dto/refresh-token-response-dto';

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
    const user = await this.userService.findUserbyToken(token);
    const saltRounds = await this.configService.get(envConstants.Bcrypt.SALT_ROUNDS)
    const hashedPassword = await this.bcryptService.hashData(password, saltRounds);
    return this.userService.updateUser(user.id, { password: hashedPassword });
  }
  async forgetPassword(email: string): Promise<ForgetPasswordResponseDto> {
    const user = await this.userService.findUserbyemail(email);
    console.log(email);

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
    console.log(resetUrl);

    const mailSent = this.mailService.sendResetmail({
      username: upadatedUser.firstname,
      email: upadatedUser.email,
      link: resetUrl,

    });
    if (!mailSent) {
      return { message: envConstants.MailModule.EMAIL_NOT_SENT }
    }
    return { message: envConstants.MailModule.EMAIL_SENT }
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
    return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, fullName: newUser.firstname + ' ' + newUser.lastname, email: newUser.firstname + ' ' + newUser.email };

  }
  async singIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const user = await this.userService.findUserbyemail(signInDto.email);
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
    return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, fullName: user.firstname + ' ' + user.lastname, email: user.email };
  }

  async updateRefreshToken(id: string, token: string): Promise<User> {
    const saltRounds = await this.configService.get(envConstants.Bcrypt.SALT_ROUNDS)
    const hashedRefreshToken = await this.bcryptService.hashData(token, saltRounds);
    return await this.userService.updateUser(id, {
      refreshToken: hashedRefreshToken,
    });
  }
  async refreshTokens(id: string, token: string): Promise<RefreshTokeneResponseDto> {
    const user = await this.userService.findUserbyid(id);
    if (!user || !user.refreshToken)
      throw new AccessDeniedExeption()
    const refreshTokenMatches = await this.bcryptService.comparePasswords(user.refreshToken, token);

    if (!refreshTokenMatches)
      throw new AccessDeniedExeption()
    const tokens = await getTokens(
      user.id,
      user.email,
      this.jwtService,
      this.configService,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
  }
}
