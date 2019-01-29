import { createParamDecorator } from '@nestjs/common';
import { SortInterface } from '../../interfaces/general/sort.interface';

export const Sort = createParamDecorator(
  (data, req): SortInterface => {
    let sort: SortInterface;
    // TODO : Parsear correctamente
    sort = {
      createdAt: -1,
    };

    return sort;
  },
);
