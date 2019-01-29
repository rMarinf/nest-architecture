import { createParamDecorator } from '@nestjs/common';

export const Pagination = createParamDecorator((data, req) => {
  return {
    skip: req.skip || 0,
    limit: req.query.limit || 10,
    page: req.query.page || 1,
  };
});
