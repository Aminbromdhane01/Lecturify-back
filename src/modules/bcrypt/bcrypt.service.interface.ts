export const BCRYPT_SERVICE = 'BCRYPT_SERVICE';
export interface IBcryptService {

    hashData(data: string, saltRounds: number): Promise<string>
    comparePasswords(inputPassword: string, hashedpassword: string): Promise<Boolean>


}