import { envConstants } from '@app/config/constants';
import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: envConstants.AuthModule.EMAIL_DESCRIPTION,
    example: envConstants.AuthModule.EMAIL_EXAMPLE,
  })
  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  @IsEmail({}, { message: envConstants.AuthModule.INAVALID_EMAIL_MESSAGE })
  email: string;

  @ApiProperty({
    description: envConstants.AuthModule.PASSWORD_DESCRIPTION,
    example: envConstants.AuthModule.PASSWORD_EXAMPLE,
  })
  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  @Matches(envConstants.UserModule.PASSWORD_REG_EX, {
    message: envConstants.UserModule.PASSWORD_ERROR_MESSAGE,
  })
  password: string;
}
