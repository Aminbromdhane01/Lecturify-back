import { envConstants } from '@app/config/constants';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: envConstants.UserModule.FIRSTNAME_DESCRIPTION,
    example: envConstants.UserModule.FIRSTNAME_EXAMPLE,
  })
  @IsNotEmpty({ message: envConstants.UserModule.FIRSTNAME_ERROR_MESSAGE })
  @IsStringWithMessage()
  firstname: string;

  @ApiProperty({
    description: envConstants.UserModule.LASTNAME_DESCRIPTION,
    example: envConstants.UserModule.LASTNAME_EXAMPLE,
  })
  @IsNotEmpty({ message: envConstants.UserModule.LASTNAME_ERROR_MESSAGE })
  @IsStringWithMessage()
  lastname: string;

  @ApiProperty({
    description: envConstants.AuthModule.EMAIL_DESCRIPTION,
    example: envConstants.AuthModule.EMAIL_EXAMPLE,
  })
  @IsNotEmpty({ message: envConstants.UserModule.EMAIL_ERROR_MESSAGE })
  @IsStringWithMessage()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: envConstants.AuthModule.PASSWORD_DESCRIPTION,
    example: envConstants.AuthModule.PASSWORD_EXAMPLE,
  })
  @Matches(envConstants.UserModule.PASSWORD_REG_EX, {
    message: envConstants.UserModule.PASSWORD_ERROR_MESSAGE,
  })
  @IsStringWithMessage()
  password: string;
}
