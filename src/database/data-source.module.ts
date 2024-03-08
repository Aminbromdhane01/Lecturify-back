import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AbstractDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USERNAME'),
                password: '',
                database: 'lecturify',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                migrations: ['dist/database/migrations/*.js']

            })
        })
    ],

})
export class DataBaseModule { }