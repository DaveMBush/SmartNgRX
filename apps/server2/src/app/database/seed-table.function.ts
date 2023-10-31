import { db } from './database';

export function seedTable(
  tableName: string,
  parentId: string,
  ids: number[],
  count: number,
): number[] {
  const stmt = db.prepare(
    `INSERT INTO ${tableName} (name, ${parentId}) VALUES (?,?)`,
  );
  for (let i = 1; i < count + 1; i++) {
    const parent = Math.floor(Math.random() * ids.length);
    stmt.run(`${tableName} ${i}`, ids[parent]);
  }

  const select = db.prepare(`SELECT ID FROM ${tableName}`);
  return (select.all() as { id: number }[]).map((x) => x.id);
}
