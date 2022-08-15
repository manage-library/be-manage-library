// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PORT } from './constants/EnvKey';
import { TransformInterceptor } from './interceptors/index';
import { HttpExceptionFilter } from './filters/http-exception.filter';

import { initializeApp } from 'firebase-admin/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('No Name Project')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  initializeApp({
    projectId: 'lyme-fdb26',
  });

  await app.listen(configService.get(PORT));
}
bootstrap();
