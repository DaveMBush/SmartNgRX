import Db, { Database } from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

/**
 * creates the database using the sql file in the assets folder
 */
export function createDatabase(): Database {
  try {
    // assumption is the database did not exist
    const d = new Db('database.db');
    const version = fs.readFileSync(
      path.resolve(__dirname, './assets/tables/database.1.0.0.sql'),
      'utf-8',
    );
    d.exec(version);
    return d;
  } catch (error: unknown) {
    process.exit(1);
  }
}
