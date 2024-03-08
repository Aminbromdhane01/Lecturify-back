import { envConfig } from "@app/config/constantes";
import { Inject, Injectable } from "@nestjs/common";
import { PROPERTY_DEPS_METADATA } from "@nestjs/common/constants";
import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
@Injectable()
export class AbstractDataSource {

    @Inject(ConfigService)
    private readonly configService: ConfigService
    constructor(

    ) { }

    getDataSourceOptions(): DataSourceOptions {

        return {
            type: 'mysql',
            host: this.configService.get<string>('DATABASE_HOST'),
            port: 3306,
            username: 'root',
            password: '',
            database: 'lecturify',
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            migrations: ['dist/database/migrations/*.js']
        }

    }
}


