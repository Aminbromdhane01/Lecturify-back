import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '@app/modules/auth/interfaces/auth.service.interface';
import { signInDto } from '@app/modules/auth/dto/signin-auth.dto';
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
import { ConflictException } from '@app/exceptions/ConflictExeption';
import { envConfig } from '@app/config/constantes';
import { NotFoundException } from '@app/exceptions/NotFoundExeption';
import { generateToken } from '@app/modules/auth/helpers/GenerateResetToken';
import {
  IMailService,
  MAIL_TOKEN,
} from '@app/modules/mail/mail.service.interface';
import { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import { BadRequestException } from '@app/exceptions/BadRequestException';
import { ForbiddenException } from '@app/exceptions/ForbiddenException';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';

@Injectable()
export class AuthService implements IAuthService {
  async resetPassword({
    token,
    password,
    confirmPassword,
  }: ResetPasswordDto): Promise<User> {
    if (password != confirmPassword) {
      throw new BadRequestException(envConfig.PASSWORDS_DO_NOT_MATCH);
    }

    const user = await this.userService.findUserbyToken(token);
    if (!user) {
      throw new NotFoundException(envConfig.USER_NOT_FOUND_OR_TOKEN_EXPIRED);
    }

    const hashedPassword = await hashData(password);
    return this.userService.updateUser(user.id, { password: hashedPassword });
  }
  async forgetPassword(email: string): Promise<void> {
    const user = await this.userService.findUserbyemail(email);
    if (!user) {
      throw new NotFoundException(envConfig.USER_NOT_FOUND);
    }
    const token = generateToken();

    const upadatedUser = await this.userService.updateUser(user.id, {
      resetPasswordToken: token,
    });

    const resetUrl =
      this.configService.get(envConfig.RESET_PASSWORD_URL) + token;

    return this.mailService.sendResetmail({
      username: upadatedUser.firstname,
      email: upadatedUser.email,
      link: resetUrl,
    });
  }

  @Inject(USER_SERVICE)
  private readonly userService: IUserService;
  @Inject(MAIL_TOKEN)
  private readonly mailService: IMailService;
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(ConfigService)
  private configService: ConfigService;

  async validateUser({ email, password }: signInDto): Promise<User> {
    const user = await this.userService.findUserbyemail(email);
    if (user && comparePasswords(user.password, password)) {
      return user;
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<SignInResponseDto> {
    const userExists = await this.userService.findUserbyemail(
      createUserDto.email,
    );
    console.log(userExists);

    if (userExists) {
      throw new ConflictException(envConfig.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await hashData(createUserDto.password);

    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    console.log(newUser);

    const tokens = await getTokens(
      newUser.id,
      newUser.email,
      this.jwtService,
      this.configService,
    );
    console.log(tokens);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }
  async singIn(signInDto: signInDto): Promise<SignInResponseDto> {
    const user = await this.userService.findUserbyemail(signInDto.email);

    if (!user) {
      throw new BadRequestException(envConfig.INVALID_EMAIL_OR_PASSWORD);
    }
    const passwordMatches = await comparePasswords(
      user.password,
      signInDto.password,
    );
    if (!passwordMatches) {
      throw new BadRequestException(envConfig.INVALID_EMAIL_OR_PASSWORD);
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
    return await this.userService.updateUser(id, { refreshToken: null });
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
      throw new ForbiddenException(envConfig.ACCESS_DENIED);
    const refreshTokenMatches = comparePasswords(user.refreshToken, token);

    if (!refreshTokenMatches)
      throw new ForbiddenException(envConfig.ACCESS_DENIED);
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
