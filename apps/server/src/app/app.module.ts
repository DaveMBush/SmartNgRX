import { Module } from '@nestjs/common';

import { DepartmentsModule } from './departments/departments.module';
import { DocsModule } from './docs/docs.module';
import { FoldersModule } from './folders/folders.module';
import { ListsModule } from './lists/lists.module';
import { LocationsModule } from './locations/locations.module';
import { PrismaModule } from './orm/prisma.module';
import { SocketGateway } from './socket/socket.gateway';
import { SocketService } from './socket/socket.service';
import { SprintFoldersModule } from './sprint-folders/sprint-folders.module';
import { TopModule } from './top/top.module';

@Module({
  imports: [
    PrismaModule,
    TopModule,
    LocationsModule,
    DepartmentsModule,
    DocsModule,
    FoldersModule,
    SprintFoldersModule,
    ListsModule,
  ],
  controllers: [],
  providers: [SocketGateway, SocketService],
})
export class AppModule {}
