import { AppModule } from '@app/app.module';
//import { HttpExceptionFilter } from '@app/comon/http-exception.filter';
import { setupSwagger } from '@app/comon/swagger';
import { envConstants } from '@app/config/constants';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { HttpExceptionFilter } from './comon/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter(configService));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  setupSwagger(app);
  app.enableCors();
  await app.listen(
    configService.get<string>(envConstants.PORT) ||
      envConstants.Global.PORT,
  );
}

void bootstrap();
