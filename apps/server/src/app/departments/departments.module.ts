import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { DepartmentsController } from './department.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DepartmentsController],
  providers: [],
})
export class DepartmentsModule {}
