import { AppModule } from '@app/app.module';
import { envConstants } from '@app/config/constantes';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@app/comon/http-exception.filter';
import { setupSwagger } from '@app/comon/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter())
  setupSwagger(app);

  await app.listen(configService.get<string>(envConstants.PORT) || '3000');
}
bootstrap();
