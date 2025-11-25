import { PrismaClient } from '@prisma/client';

import { adapter } from './prisma-adapter';

export const prisma = new PrismaClient({ adapter });
