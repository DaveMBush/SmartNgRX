import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SprintFoldersController } from './sprint-folders.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SprintFoldersController],
  providers: [],
})
export class SprintFoldersModule {}
