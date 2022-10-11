import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const API_PREFIX = process.env.API_PREFIX || '/api';
const PORT = process.env.PORT || 4337;
const ADDRESS = process.env.ADDRESS || '0.0.0.0';

export const CORS_OPTIONS = {
  origin: process.env.ALLOWED_ORIGINS,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: CORS_OPTIONS,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Battle peer')
    .setDescription('The Battle peer API description')
    .setVersion('1.0.0')
    .addTag('battle-peer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, ADDRESS, () => {
    console.log(`Server started on http://localhost:${PORT}${API_PREFIX}`);
    console.log(`API docs on http://localhost:${PORT}${API_PREFIX}/docs`);
  });
}

(async () => await bootstrap())();
