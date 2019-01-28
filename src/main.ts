import * as proxy from 'http-proxy-middleware';
import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, server);

  // Add proxy
  app.use(
    ['/oam*', '/catalog/store/[0-9]+$'],
    proxy({
      target: 'https://www.bershka.com/itxrest/2',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  );

  // Add compression
  app.use(compression());

  // Add helmet
  app.use(helmet());

  // Enable CORS
  app.enableCors();

  // Add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
