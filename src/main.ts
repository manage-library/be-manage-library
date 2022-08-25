// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PORT } from './constants/EnvKey';
import { TransformInterceptor } from './interceptors/index';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Logger } from './common/helpers/logger';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req: Request, res: Response, next: () => void) => {
    const correlationId = uuid();
    req.timestamp = Date.now();
    req.correlationId = correlationId;
    next();
  });

  const logger = new Logger();

  app.useGlobalInterceptors(new TransformInterceptor(logger));
  app.useGlobalFilters(new HttpExceptionFilter(logger));

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

  await app.listen(configService.get(PORT));
}
bootstrap();
