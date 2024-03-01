import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  const configSwagger = new DocumentBuilder()
    .setTitle('Lecturify')
    .setDescription('Lecturify API description')
    .setVersion('1.0')
    .addTag('LCT')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  await app.listen(config.get(envConfig.PORT));
}
bootstrap();
