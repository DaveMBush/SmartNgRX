import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { DocsController } from './docs.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DocsController],
  providers: [],
})
export class DocsModule {}
