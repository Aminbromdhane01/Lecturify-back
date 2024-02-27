import { PROPERTY_DEPS_METADATA } from "@nestjs/common/constants";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: ['dist/database/migrations/*.js']
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource