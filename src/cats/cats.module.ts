import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatSchema } from './models/cat.model';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CatsMiddleware } from './middlewares/cats.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]),
    CacheModule.register(),
  ],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CatsMiddleware)
      .with('cat')
      .forRoutes(
        { path: '/cats/:cat', method: RequestMethod.GET },
        { path: '/cats/:cat', method: RequestMethod.PATCH },
        { path: '/cats/:cat', method: RequestMethod.DELETE },
      );
  }
}
