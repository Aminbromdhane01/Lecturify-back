import { CreateAuthDto } from "../dto/create-auth.dto"
import { signInDto } from "../dto/signin-auth.dto"
export const AUTH_SERVICE = 'AUTH_SERVICE';
export interface IAuthService {

    signUp(createUserDto: CreateAuthDto): Promise<any>
    singIn(signInDto: signInDto): Promise<any>
    logOut(id: String): Promise<any>


}