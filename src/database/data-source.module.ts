import { envConstants } from '@app/config/constantes';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: "mysql",
        host: configService.get<string>(envConstants.DataBase.DATABASE_HOST),
        port: configService.get<number>(envConstants.DataBase.DATABASE_PORT),
        username: configService.get<string>(envConstants.DataBase.DATABASE_USERNAME),
        password: configService.get<string>(envConstants.DataBase.DATABASE_PASSWORD),
        database: configService.get<string>(envConstants.DataBase.DATABASE_NAME),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/database/migrations/*.js'],
      }),
    }),
  ],
})
export class DataBaseModule { }
