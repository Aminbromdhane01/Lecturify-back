import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { envConstants } from '@app/config/constantes';

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