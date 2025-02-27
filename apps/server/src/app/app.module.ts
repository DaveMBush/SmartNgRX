import { Module } from '@nestjs/common';

import { DepartmentsModule } from './departments/departments.module';
import { DocsModule } from './docs/docs.module';
import { FoldersModule } from './folders/folders.module';
import { ListsModule } from './lists/lists.module';
import { LocationsModule } from './locations/locations.module';
import { PrismaModule } from './orm/prisma.module';
import { SocketModule } from './socket/socket.module';
import { SocketService } from './socket/socket.service';
import { SprintFoldersModule } from './sprint-folders/sprint-folders.module';
import { TopModule } from './top/top.module';

@Module({
  imports: [
    PrismaModule,
    SocketModule,
    TopModule,
    LocationsModule,
    DepartmentsModule,
    DocsModule,
    FoldersModule,
    SprintFoldersModule,
    ListsModule,
  ],
  controllers: [],
  providers: [SocketService],
})
export class AppModule {}
