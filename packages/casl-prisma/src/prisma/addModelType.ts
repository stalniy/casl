import { Prisma } from '@prisma/client';
import { subject } from '@casl/ability';

export const addModelType: Prisma.Middleware = async (params, next) => {
  const result = await next(params);
  const type = params.model;

  if (!type) {
    return result;
  }

  if (!Array.isArray(result)) {
    return subject(type, result);
  }

  for (let i = 0; i < result.length; i++) {
    subject(type, result[i]);
  }

  return result;
};
