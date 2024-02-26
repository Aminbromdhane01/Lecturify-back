import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envConfig } from '@app/config/constantes'
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  const config_swagger = new DocumentBuilder()
    .setTitle('Lecturify')
    .setDescription('Lecturify API description')
    .setVersion('1.0')
    .addTag('LCT')
    .build();
  const document = SwaggerModule.createDocument(app, config_swagger);
  SwaggerModule.setup('api', app, document);


  await app.listen(config.get(envConfig.PORT));
}
bootstrap();
