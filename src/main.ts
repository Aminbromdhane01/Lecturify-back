import { AppModule } from '@app/app.module';
import { envConstants } from '@app/config/constants';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@app/comon/http-exception.filter';
import { setupSwagger } from '@app/comon/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(cookieParser());


  setupSwagger(app);
  app.enableCors()
  await app.listen(configService.get<string>(envConstants.PORT) || envConstants.Global.PORT);

}
bootstrap();
