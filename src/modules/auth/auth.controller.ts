import { Controller, Get, Post, Body, Inject, ValidationPipe, UsePipes, Put, Req, UseGuards, Res, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import {
  AUTH_SERVICE,
  IAuthService,
} from '@app/modules/auth/interfaces/auth.service.interface';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import { User } from '@app/modules/user/user.entity';
import { SignInDto } from '@app/modules/auth/dto/signin-auth.dto';
import { SignUpDto } from '@app/modules/auth/dto/signup-auth.dto';
import { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import { RefreshTokenGuard } from '@app/guards/refresh-token.guard';
import { ForgetDto } from '@app/modules/auth/dto/forget-password.dto';
import { ForgetPasswordResponseDto } from '@app/modules/auth/dto/forget-password-response.dto';
import { RefreshTokenRequest } from '@app/modules/auth/interfaces/auth.refreshtoken.request.interface';
import { envConstants } from '@app/config/constants';
import { RefreshTokeneResponseDto } from './dto/refresh-token-response-dto';

@Controller('auth')
export class AuthController {
  @Inject(AUTH_SERVICE)
  private readonly authService: IAuthService;
  @UsePipes(ValidationPipe)
  @Post('singin')
  async signIn(@Body() signInCredentials: SignInDto): Promise<SignInResponseDto> {
    return this.authService.singIn(signInCredentials);
  }
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async singUp(@Body() singUpDto: SignUpDto
  ): Promise<SignInResponseDto> {
    return await this.authService.signUp(singUpDto);
  }
  @UsePipes(ValidationPipe)
  @Post('forget-password')
  async forgetPassword(@Body() forgetDto: ForgetDto): Promise<ForgetPasswordResponseDto> {
    return this.authService.forgetPassword(forgetDto.email)
  }
  @UsePipes(ValidationPipe)
  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<User> {
    return this.authService.resetPassword(resetPasswordDto);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshToekn(@Req() req: RefreshTokenRequest): Promise<RefreshTokeneResponseDto> {
    const userId = req.user[envConstants.AuthModule.USER_ID_ARG];
    const refreshToken = req.user[envConstants.AuthModule.REFRESH_TOKEN_ARG]
    return this.authService.refreshTokens(userId, refreshToken);
  }

}
