import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { FoldersController } from './folders.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FoldersController],
  providers: [],
})
export class FoldersModule {}
