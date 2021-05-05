import { createPrismaInterpreter } from './prisma/interpreter';
import * as operators from './prisma/operators';

export const interpreter = createPrismaInterpreter(operators);
