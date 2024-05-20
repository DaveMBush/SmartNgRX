import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { TopController } from './top.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TopController],
  providers: [],
})
export class TopModule {}
