import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { prismaServiceToken } from './prisma-service.token';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: prismaServiceToken,
      useValue: new PrismaClient(),
    },
  ],
  exports: [prismaServiceToken],
})
export class PrismaModule {}
