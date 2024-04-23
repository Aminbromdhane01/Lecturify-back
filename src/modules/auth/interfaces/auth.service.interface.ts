import { envConstants } from '@app/config/constants';
import type { ForgetPasswordResponseDto } from '@app/modules/auth/dto/forget-password-response.dto';
import type { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import type { SignInDto } from '@app/modules/auth/dto/signin-auth.dto';
import type { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import type { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import type { User } from '@app/modules/user/user.entity';

import type { RefreshTokeneResponseDto } from '../dto/refresh-token-response-dto';
export const AUTH_SERVICE = envConstants.AuthModule.AUTH_SERVICE;
export interface IAuthService {
  signUp(createUserDto: CreateUserDto): Promise<SignInResponseDto>;
  singIn(signInDto: SignInDto): Promise<SignInResponseDto>;
  updateRefreshToken(id: string, token: string): Promise<User>;
  refreshTokens(
    id: string,
    token: string,
  ): Promise<RefreshTokeneResponseDto>;
  forgetPassword(email: string): Promise<ForgetPasswordResponseDto>;
  resetPassword({
    token,
    password,
    confirmPassword,
  }: ResetPasswordDto): Promise<User>;
}
