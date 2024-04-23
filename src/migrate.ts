import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { getOrmOptions } from './database/data-source';
import { DataBaseModule } from './database/database.module';

async function bootstrap() {
  const migarate = await NestFactory.create(DataBaseModule);
  const configService = migarate.get(ConfigService);
  const dataoptions = getOrmOptions(configService);
  console.log(dataoptions);

  return new DataSource(dataoptions);
}

export default bootstrap();
