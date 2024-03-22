import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../helpers/MatchesDecorator';
import { envConstants } from '@app/config/constants';
export class ResetPasswordDto {
  @ApiProperty({
    description: envConstants.AuthModule.RESET_TOKEN_DESCRIPTION,
    example: envConstants.AuthModule.RESET_TOKEN_EXAMPLE
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    description: envConstants.AuthModule.NEW_PASSWORD_DESCRIPTION,
    example: envConstants.AuthModule.PASSWORD_EXAMPLE
  })
  @IsNotEmpty()
  @IsString()
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
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
