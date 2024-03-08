import { ConfigService } from '@nestjs/config';

import { DataSource } from 'typeorm';
import { AbstractDataSource } from './data-source';

const configService = new ConfigService();
const abstractDataSource = new AbstractDataSource()
export const dataSourceOptions = abstractDataSource.getDataSourceOptions()
console.log(dataSourceOptions);

export const dataSource = new DataSource(dataSourceOptions);
