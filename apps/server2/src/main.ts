import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Database } from 'better-sqlite3';

import { AppModule } from './app/app.module';
import { db } from './app/database/database';

async function bootstrap(): Promise<void> {
  const database = db as Database | undefined;
  if (!database) {
    Logger.error('❌ Failed to connect to database');
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule, { logger: false });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap().catch((err) => {
  Logger.error(err);
});
