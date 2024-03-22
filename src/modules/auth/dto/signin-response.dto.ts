import { envConstants } from '@app/config/constants';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description: envConstants.AuthModule.REFRESH_TOKEN_DESCRIPTION,
    example: envConstants.AuthModule.TOKEN_EXAMPLE,
  })
  refreshToken: string;

  @ApiProperty({
    description: envConstants.AuthModule.ACCESS_TOKEN_DESCRIPTION,
    example: envConstants.AuthModule.TOKEN_EXAMPLE,
  })
  accessToken: string;
}