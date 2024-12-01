import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { GlobalExceptionsFilter } from './utilities/exception/global.exception';
import { TransformInterceptor } from './utilities/interceptor/global.interceptor';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerSpec = fs.readFileSync(
    path.join(__dirname, '../swagger.yaml'),
    'utf-8',
  );
  const document = YAML.load(swaggerSpec); // Use YAML.load instead of YAML.parse
  SwaggerModule.setup('api', app, document as any);

  app.use(helmet());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
