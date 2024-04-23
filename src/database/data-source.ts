import { envConstants } from '@app/config/constants';
import type { ConfigService } from '@nestjs/config';
import type { DataSourceOptions } from 'typeorm';

export function getOrmOptions(
  configService: ConfigService,
): DataSourceOptions {
  return {
    type: 'mysql',
    host: configService.get<string>(envConstants.DataBase.DATABASE_HOST),
    port: configService.get<number>(envConstants.DataBase.DATABASE_PORT),
    username: configService.get<string>(
      envConstants.DataBase.DATABASE_USERNAME,
    ),
    password: configService.get<string>(
      envConstants.DataBase.DATABASE_PASSWORD,
    ),
    database: configService.get<string>(
      envConstants.DataBase.DATABASE_NAME,
    ),
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*.js'],
  };
}
