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
import { envConstants } from '@app/config/constantes';
import { generateToken } from '@app/modules/auth/helpers/GenerateResetToken';
import {
  IMailService,
  MAIL_SERVICE,
} from '@app/modules/mail/mail.service.interface';
import { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import { PasswordDoNotMatchException } from '@app/exceptions/PasswordDoNotMatchException';
import { UserAlreadyExitsException } from '@app/exceptions/UserAlreadyExistsException';
import { InvalidEmailOrPasswordExeption } from '@app/exceptions/InvalidEmailOrPasswordException';
import { AccessDeniedExeption } from '@app/exceptions/AccessDeniedExeption';
import { UserNotFoundException } from '@app/exceptions/UserNotFoundExeption';

@Injectable()
export class AuthService implements IAuthService {


  @Inject(USER_SERVICE)
  private readonly userService: IUserService;
  @Inject(MAIL_SERVICE)
  private readonly mailService: IMailService;
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(ConfigService)
  private configService: ConfigService;
  async resetPassword({ token, password, confirmPassword, }: ResetPasswordDto): Promise<User> {
    if (password != confirmPassword) {
      throw new PasswordDoNotMatchException()
    }

    const user = await this.userService.findUserbyToken(token);


    const hashedPassword = await hashData(password);
    return this.userService.updateUser(user.id, { password: hashedPassword });
  }
  async forgetPassword(email: string): Promise<void> {
    const user = await this.userService.findUserbyemail(email);

    const token = generateToken();

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

  async validateUser({ email, password }: signInDto): Promise<User | undefined> {
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
      // Handle the case where the user does not exist
      if (error instanceof UserNotFoundException) {
        userExists = false;
      } else {
        // Re-throw other exceptions
        throw error;
      }
    }


    if (userExists) {
      throw new UserAlreadyExitsException()
    }

    const hashedPassword = await hashData(createUserDto.password);

    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    if (!newUser) {

      throw new Error('Erro');
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
  async singIn(signInDto: signInDto): Promise<SignInResponseDto> {
    const user = await this.userService.findUserbyemail(signInDto.email);

    if (!user) {
      throw new InvalidEmailOrPasswordExeption()
    }
    const passwordMatches = await comparePasswords(
      user.password,
      signInDto.password,
    );
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
