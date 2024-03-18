import { CreateAuthDto } from '@app/modules/auth/dto/create-auth.dto';
import { signInDto } from '@app/modules/auth/dto/signin-auth.dto';
import { User } from '@app/modules/user/user.entity';
import { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import { envConfig } from '@app/config/constantes';
export const AUTH_SERVICE = envConfig.AUTH_SERVICE_TOKEN;
export interface IAuthService {
  validateUser({ email, password }: signInDto): Promise<User>;
  signUp(createUserDto: CreateAuthDto): Promise<SignInResponseDto>;
  singIn(signInDto: signInDto): Promise<SignInResponseDto>;
  logOut(id: string): Promise<User>;
  updateRefreshToken(id: string, token: string): Promise<User>;
  refreshTokens(id: string, token: string): Promise<SignInResponseDto>;
  forgetPassword(email: string): Promise<void>;
  resetPassword({
    token,
    password,
    confirmPassword,
  }: ResetPasswordDto): Promise<User>;
}
