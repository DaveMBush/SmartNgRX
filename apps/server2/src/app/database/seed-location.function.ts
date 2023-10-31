import { db } from './database';

export function seedLocation(): number[] {
  const stmt = db.prepare(`INSERT INTO locations (name) VALUES (?)`);
  for (let i = 1; i < 3; i++) {
    stmt.run(`Location ${i}`);
  }

  const select = db.prepare('SELECT ID FROM locations');
  return (select.all() as { id: number }[]).map((x) => x.id);
}
