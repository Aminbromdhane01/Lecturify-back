import { PROPERTY_DEPS_METADATA } from "@nestjs/common/constants";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'lecturify',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: ['dist/database/migrations/*.js']
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource