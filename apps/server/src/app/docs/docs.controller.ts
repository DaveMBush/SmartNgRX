import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { DocsDTO } from './docs-dto.interface';

@Controller('docs')
export class DocsController {
  constructor(@Inject(prismaServiceToken) private prisma: PrismaClient) {}

  @Post()
  async getByIds(@Body() ids: string[]): Promise<DocsDTO[]> {
    return this.prisma.docs.findMany({
      where: { did: { in: ids } },
      select: {
        did: true,
        name: true,
      },
    });
  }
}
