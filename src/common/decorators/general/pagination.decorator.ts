import { createParamDecorator } from '@nestjs/common';
import * as aqp from 'api-query-params';

export const Pagination = createParamDecorator((data, req) => {
  const pagination = Object.assign({}, aqp(req.query), { skip: req.skip });
  return {
    skip: pagination.skip || 0,
    limit: pagination.limit || 10,
    page: pagination.filter.page || 1,
  };
});
