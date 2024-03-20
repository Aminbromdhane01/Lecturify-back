import { signInDto } from '@app/modules/auth/dto/signin-auth.dto';
import { User } from '@app/modules/user/user.entity';
import { ResetPasswordDto } from '@app/modules/auth/dto/reset-password.dto';
import { SignInResponseDto } from '@app/modules/auth/dto/signin-response.dto';
import { envConstants } from '@app/config/constantes';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
export const AUTH_SERVICE = envConstants.AuthModule.AUTH_SERVICE;
export interface IAuthService {
  validateUser({ email, password }: signInDto): Promise<User | undefined>;
  signUp(createUserDto: CreateUserDto): Promise<SignInResponseDto>;
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
