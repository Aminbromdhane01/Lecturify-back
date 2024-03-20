export interface IBcryptService {
    hashData(data: string): Promise<string>
    comparePasswords(inputPassword: string, hashedpassword: string): Promise<Boolean>
    generateToken(expireInMinutes: number): string
    generateHashedToken(expireInMinutes: number): Promise<string>

}