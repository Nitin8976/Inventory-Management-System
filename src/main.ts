import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  const configService = app.get(ConfigService);

  // Swagger api documentation
  if (configService.get('app.isDocApiEnabled')) {
    const config = new DocumentBuilder()
      .setTitle(configService.get('app.docApiTitle'))
      .setDescription(configService.get('app.docApiDesc'))
      .setVersion(configService.get('app.docApiV'))
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
  }
  bootstrap();
}