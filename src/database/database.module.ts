import { envConstants } from '@app/config/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseType, DataSource, DataSourceOptions } from 'typeorm';

import { getOrmOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getOrmOptions(configService),
    }),
  ],
})
export class DataBaseModule {}
