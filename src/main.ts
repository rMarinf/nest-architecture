import * as proxy from 'http-proxy-middleware';
import * as http2 from 'http2';
import * as express from 'express';
import * as morgan from 'morgan';
import * as paginate from 'express-paginate';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const key = fs.readFileSync('localhost-privkey.pem');
  const cert = fs.readFileSync('localhost-cert.pem');
  const options = {
    httpsOptions: {
      key,
      cert,
    },
  };
  const server = http2.createSecureServer(options.httpsOptions);
  const app = await NestFactory.create(AppModule, server, options);

  // Add morgan
  // TODO: Llevar a configuración
  app.use(morgan((new ConfigService(`${process.env.NODE_ENV}.env`)).get('MORGAN')));

  // Add compression
  app.use(compression());

  // Add paginate middleware
  app.use(paginate.middleware(10, 50));

  // Add helmet
  app.use(helmet());

  // Enable CORS
  app.enableCors();

  // Add proxy
  app.use(
    ['/oam*', '/catalog/store/[0-9]+$'],
    proxy({
      target: 'https://www.bershka.com/itxrest/2',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  );

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
