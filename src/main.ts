
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('v1')

  if (configService.get('app.isDocApiEnabled')) {
    const config = new DocumentBuilder()
      .setTitle(configService.get('app.docApiTitle'))
      .setDescription(configService.get('app.docApiDesc'))
      .setVersion(configService.get('app.docApiV'))
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }, 'jwt')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(configService.get('app.docApiBaseUrl'), app, document, {
      swaggerOptions: {
        persistAuthorization: true
      }
    });
  }

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(configService.get('app.port'));
}
bootstrap();