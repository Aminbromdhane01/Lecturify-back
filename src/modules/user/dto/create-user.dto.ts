import { envConstants } from '@app/config/constantes';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: envConstants.UserModule.FIRSTNAME_ERROR_MESSAGE })
  firstname: string;
  @IsNotEmpty({ message: envConstants.UserModule.LASTNAME_ERROR_MESSAGE })
  lastname: string;
  @IsNotEmpty({ message: envConstants.UserModule.EMAIL_ERROR_MESSAGE })
  @IsEmail()
  email: string;
  @Matches(
    envConstants.UserModule.PASSWORD_REG_EX,
    {
      message:
        envConstants.UserModule.PASSWORD_ERROR_MESSAGE
    },
  )
  password: string;
}
