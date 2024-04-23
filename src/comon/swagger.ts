import { envConstants } from '@app/config/constants';
import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const documentBuilder = new DocumentBuilder()
    .setTitle(envConstants.Swagger.SWAGGER_TITLE)
    .setDescription(envConstants.Swagger.SWAGGER_DESCRIPTION)
    .setVersion(envConstants.Swagger.SWAGGER_VERSION)
    .addTag(envConstants.Swagger.SWAGGER_TAG)
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);
}
