import { AppModule } from '@app/app.module';
import { envConfig } from '@app/config/constantes';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


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
