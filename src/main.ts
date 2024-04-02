import { AppModule } from '@app/app.module';
import { envConstants } from '@app/config/constants';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@app/comon/http-exception.filter';
import { setupSwagger } from '@app/comon/swagger';
import { getOrmOptions } from './database/data-source';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter())
  const dataoptions = await getOrmOptions(configService)
  console.log(dataoptions);

  setupSwagger(app);
  app.enableCors()
  await app.listen(configService.get<string>(envConstants.PORT) || envConstants.Global.PORT);

}
bootstrap();
