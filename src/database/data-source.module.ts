import { envConfig } from '@app/config/constantes';
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
        host: configService.get<string>(envConfig.DATABASE_HOST),
        port: configService.get<number>(envConfig.DATABASE_PORT),
        username: configService.get<string>(envConfig.DATABASE_USERNAME),
        password: '',
        database: 'lecturify',
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/database/migrations/*.js'],
      }),
    }),
  ],
})
export class DataBaseModule { }
