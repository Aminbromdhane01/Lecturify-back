import { CreateUserDto } from "@app/modules/user/dto/create-user.dto";
import { CreateAuthDto } from "../dto/create-auth.dto"
import { signInDto } from "../dto/signin-auth.dto"
import { User } from "@app/modules/user/user.entity";
export const AUTH_SERVICE = 'AUTH_SERVICE';
export interface IAuthService {
    validateUser({ email, password }: signInDto): Promise<User>
    signUp(createUserDto: CreateAuthDto): Promise<any>
    singIn(signInDto: signInDto): Promise<any>
    logOut(id: string): Promise<any>
    updateRefreshToken(id: string, token: string): Promise<any>
    RefreshTokens(id: string, token: string): Promise<any>


}