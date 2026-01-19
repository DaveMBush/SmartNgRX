import 'dotenv/config';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

export const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./database.db',
});
