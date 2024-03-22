import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { envConstants } from '@app/config/constants';

export class SignInDto {
  @ApiProperty({
    description: envConstants.AuthModule.EMAIL_DESCRIPTION,
    example: envConstants.AuthModule.EMAIL_EXAMPLE
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: envConstants.AuthModule.PASSWORD_DESCRIPTION,
    example: envConstants.AuthModule.PASSWORD_EXAMPLE
  })
  @IsNotEmpty()
  @IsString()
  @Matches(envConstants.UserModule.PASSWORD_REG_EX, {
    message:
      envConstants.UserModule.PASSWORD_ERROR_MESSAGE,
  })
  password: string;
}