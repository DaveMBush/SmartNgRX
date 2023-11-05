import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { ListsController } from './lists.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ListsController],
  providers: [],
})
export class ListsModule {}
