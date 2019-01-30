import { createParamDecorator } from '@nestjs/common';
import { SortInterface } from '../../interfaces/general/sort.interface';
import * as aqp from 'api-query-params';

export const Sort = createParamDecorator(
  (data, req): SortInterface => {
    let { sort }: { sort: SortInterface } = aqp(req.query);

    if (!sort) {
      sort = {
        createdAt: -1,
      };
    }

    return sort;
  },
);
