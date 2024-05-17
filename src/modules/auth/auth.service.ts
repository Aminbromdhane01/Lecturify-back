import { envConstants } from '@app/config/constants';
import { AccessDeniedExeption } from '@app/exceptions/AccessDeniedExeption';
import { InvalidEmailOrPasswordExeption } from '@app/exceptions/InvalidEmailOrPasswordException';
import { UserAlreadyExitsException } from '@app/exceptions/UserAlreadyExistsException';
import { UserNotFoundException } from '@app/exceptions/UserNotFoundExeption';
import type { ForgetPasswordResponseDto } from '@app/modules/auth/dto/forget-password-response.dto';
import type { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import type { SignInDto } from '@app/modules/auth/dto/signin-auth.dto';
import type { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import type { IAuthService } from '@app/modules/auth/interfaces/auth.service.interface';
import {
  BCRYPT_SERVICE,
  IBcryptService,
} from '@app/modules/bcrypt/bcrypt.service.interface';
import {
  IMailService,
  MAIL_SERVICE,
} from '@app/modules/mail/mail.service.interface';
import type { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import {
  IUserService,
  USER_SERVICE,
} from '@app/modules/user/interfaces/user.service.interface';
import type { User } from '@app/modules/user/user.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { RefreshTokeneResponseDto } from './dto/refresh-token-response-dto';
import { getTokens } from './helpers/getToken';

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

  async resetPassword({
    token,
    password,
    confirmPassword,
  }: ResetPasswordDto): Promise<User> {
    const user = await this.userService.findUserbyToken(token);
    const saltRounds = await this.configService.get(
      envConstants.Bcrypt.SALT_ROUNDS,
    );
    const hashedPassword = await this.bcryptService.hashData(
      password,
      saltRounds as number,
    );

    return this.userService.updateUser(user.id, {
      password: hashedPassword,
    });
  }

  async forgetPassword(email: string): Promise<ForgetPasswordResponseDto> {
    const user = await this.userService.findUserbyemail(email);

    const expiresIn = this.configService.get(
      envConstants.AuthModule.RESET_TOKEN_EXPIRE_IN,
    );
    const secretKey = this.configService.get(
      envConstants.AuthModule.RESET_TOKEN_SECRET_KEY,
    );
    const token = this.jwtService.sign(
      { email },
      { expiresIn, secret: secretKey },
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    const upadatedUser = await this.userService.updateUser(user.id, {
      resetPasswordToken: token,
    });

    const resetUrl =
      (this.configService.get<string>(
        envConstants.MailModule.RESET_PASSWORD_URL,
      ) as string) + token;

    const mailSent = this.mailService.sendResetmail({
      username: upadatedUser.firstname,
      email: upadatedUser.email,
      link: resetUrl,
    });

    if (!mailSent) {
      return { message: envConstants.MailModule.EMAIL_NOT_SENT };
    }

    return { message: envConstants.MailModule.EMAIL_SENT };
  }

  async signUp(createUserDto: CreateUserDto): Promise<SignInResponseDto> {
    let userExists;

    try {
      userExists = await this.userService.findUserbyemail(
        createUserDto.email,
      );
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        userExists = false;
      }
    }

    if (userExists) {
      throw new UserAlreadyExitsException();
    }

    const saltRounds = this.configService.get<number>(
      envConstants.Bcrypt.SALT_ROUNDS,
    );
    const hashedPassword = await this.bcryptService.hashData(
      createUserDto.password,
      saltRounds as number,
    );

    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new NotFoundException();
    }

    const tokens = await getTokens(
      newUser.id,
      newUser.email,
      this.jwtService,
      this.configService,
    );
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      fullName: `${newUser.firstname} ${newUser.lastname}`,
      email: newUser.email,
    };
  }

  async singIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const user = await this.userService.findUserbyemail(signInDto.email);

    if (!user) {
      throw new InvalidEmailOrPasswordExeption();
    }

    const isPasswordMatches = await this.bcryptService.comparePasswords(
      signInDto.password,
      user.password,
    );

    if (!isPasswordMatches) {
      throw new InvalidEmailOrPasswordExeption();
    }

    const tokens = await getTokens(
      user.id,
      user.email,
      this.jwtService,
      this.configService,
    );

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      fullName: `${user.firstname} ${user.lastname}`,
      email: user.email,
    };
  }

  async updateRefreshToken(id: string, token: string): Promise<User> {
    const saltRounds = this.configService.get<number>(
      envConstants.Bcrypt.SALT_ROUNDS,
    );
    const hashedRefreshToken = await this.bcryptService.hashData(
      token,
      saltRounds as number,
    );

    return this.userService.updateUser(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(
    id: string,
    token: string,
  ): Promise<RefreshTokeneResponseDto> {
    const user = await this.userService.findUserbyid(id);

    if (!user || !user.refreshToken) {
      throw new AccessDeniedExeption();
    }

    const isRefreshTokenMatches =
      await this.bcryptService.comparePasswords(user.refreshToken, token);

    if (!isRefreshTokenMatches) {
      throw new AccessDeniedExeption();
    }

    const tokens = await getTokens(
      user.id,
      user.email,
      this.jwtService,
      this.configService,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
