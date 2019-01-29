import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatSchema } from './models/cat.model';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
export class CatsModule {}
