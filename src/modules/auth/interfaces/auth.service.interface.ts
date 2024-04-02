import { SignInDto } from '@app/modules/auth/dto/signin-auth.dto';
import { User } from '@app/modules/user/user.entity';
import { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import { envConstants } from '@app/config/constants';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { ForgetPasswordResponseDto } from '@app/modules/auth/dto/forget-password-response.dto';
export const AUTH_SERVICE = envConstants.AuthModule.AUTH_SERVICE;
export interface IAuthService {
  signUp(createUserDto: CreateUserDto): Promise<SignInResponseDto>;
  singIn(signInDto: SignInDto): Promise<SignInResponseDto>;
  updateRefreshToken(id: string, token: string): Promise<User>;
  refreshTokens(id: string, token: string): Promise<SignInResponseDto>;
  forgetPassword(email: string): Promise<ForgetPasswordResponseDto>;
  resetPassword({
    token,
    password,
    confirmPassword,
  }: ResetPasswordDto): Promise<User>;
}
