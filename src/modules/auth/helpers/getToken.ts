import { envConstants } from '@app/config/constants';
import type { ConfigService } from '@nestjs/config';
import type { JwtService } from '@nestjs/jwt';

export async function getTokens(
  userId: string,
  username: string,
  jwtService: JwtService,
  configService: ConfigService,
): Promise<{ accessToken: string; refreshToken: string }> {
  const [accessToken, refreshToken] = await Promise.all([
    jwtService.signAsync(
      {
        sub: userId,
        username,
      },
      {
        secret: configService.get<string>(
          envConstants.JWT.JWT_ACCESS_SECRET,
        ),
        expiresIn: '15m',
      },
    ),
    jwtService.signAsync(
      {
        sub: userId,
        username,
      },
      {
        secret: configService.get<string>(
          envConstants.JWT.JWT_REFRESH_SECRET,
        ),
        expiresIn: '7d',
      },
    ),
  ]);

  return {
    accessToken,
    refreshToken,
  };
}
