import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { envConfig } from '@app/config/constantes';

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
                secret: configService.get<string>(envConfig.JWT_ACCESS_SECRET),
                expiresIn: '15m',
            },
        ),
        jwtService.signAsync(
            {
                sub: userId,
                username,
            },
            {
                secret: configService.get<string>(envConfig.JWT_REFRESH_SECRET),
                expiresIn: '7d',
            },
        ),
    ]);

    return {
        accessToken,
        refreshToken,
    };
}