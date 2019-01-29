import { createParamDecorator } from '@nestjs/common';
import { CatEntity } from '../../entities/cat.entity';

export const Cat = createParamDecorator(
  (data, req): CatEntity | null => {
    return req.models.cat || null;
  },
);
