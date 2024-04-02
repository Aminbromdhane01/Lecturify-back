import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../helpers/MatchesDecorator';
import { envConstants } from '@app/config/constants';
import { IsStringWithMessage } from '@app/decorators/is-string-with-message.decorator';
import { IsNotEmptyWithMessage } from '@app/decorators/is-notempty-with-message.decorator';
export class ResetPasswordDto {
  @ApiProperty({
    description: envConstants.AuthModule.RESET_TOKEN_DESCRIPTION,
    example: envConstants.AuthModule.RESET_TOKEN_EXAMPLE
  })
  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  token: string;

  @ApiProperty({
    description: envConstants.AuthModule.NEW_PASSWORD_DESCRIPTION,
    example: envConstants.AuthModule.PASSWORD_EXAMPLE
  })
  @IsNotEmptyWithMessage()
  @IsStringWithMessage()
  @Matches(envConstants.UserModule.PASSWORD_REG_EX, {
    message:
      envConstants.UserModule.PASSWORD_ERROR_MESSAGE,
  })
  @Match('confirmPassword')
  password: string;

  @ApiProperty({
    description: envConstants.AuthModule.CONFIRM_PASSWORD_DESCRIPTION,
    example: envConstants.AuthModule.PASSWORD_EXAMPLE
  })
  @IsNotEmptyWithMessage()
  @IsString()
  confirmPassword: string;
}
