import Db, { Database } from 'better-sqlite3';

import { createDatabase } from './create-database.function';
import { seedDatabase } from './seed-database.function';

export let db: Database;
try {
  db = new Db('database.db', { fileMustExist: true });
} catch (error: unknown) {
  db = createDatabase();
  seedDatabase();
}
