import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { CatsService } from '../cats.service';

@Injectable()
export class CatsMiddleware implements NestMiddleware {
  constructor(private readonly catsService: CatsService) {}

  resolve(model = 'cat'): MiddlewareFunction {
    return async (req, res, next) => {
      if (!req.models) {
        req.models = {};
      }

      // Find if exists this model
      req.models[model] = await this.catsService.findOne(req.params[model]);
      next();
    };
  }
}
