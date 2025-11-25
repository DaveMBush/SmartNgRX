import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { adapter } from './prisma-adapter';
import { prismaServiceToken } from './prisma-service.token';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: prismaServiceToken,
      useValue: new PrismaClient({ adapter }),
    },
  ],
  exports: [prismaServiceToken],
})
export class PrismaModule {}
