import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

(async function main() {
  const locationIds = await seedLocations();
  if (!locationIds.length) throw new Error('No locations found after seeding');
  const departmentIds = await seedTable(
    'departments',
    'locationId',
    locationIds,
    30,
  );
  if (!departmentIds.length)
    throw new Error(`No departments found after seeding`);
  const folderIds = await seedTable(
    'folders',
    'departmentId',
    departmentIds,
    100,
  );
  if (!folderIds.length) throw new Error(`No folders found after seeding`);
  const sprintFolderIds = await seedTable(
    'sprintFolders',
    'departmentId',
    departmentIds,
    100,
  );
  if (!sprintFolderIds.length)
    throw new Error(`No sprint folders found after seeding`);
  const listIds = await seedTable('lists', 'departmentId', departmentIds, 100);
  if (!listIds.length) throw new Error(`No lists found after seeding`);
  const docIds = await seedTable(
    'docs',
    'departmentId',
    departmentIds,
    100,
    'did',
  );
  if (!docIds.length) throw new Error(`No docs found after seeding`);
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

async function seedLocations(): Promise<string[]> {
  if ((await prisma.locations.count()) === 0) {
    for (let i = 0; i < 3; i++) {
      await prisma.locations.create({
        data: {
          name: 'Location ' + i,
        },
      });
    }
  }
  return (await prisma.locations.findMany()).map((x) => x.id);
}

async function seedTable(
  tableName: string,
  columnName: string,
  ids: string[],
  count: number,
  idField: string = 'id',
): Promise<string[]> {
  const table = (prisma as Record<string, any>)[tableName];
  if ((await table.count()) === 0) {
    for (let i = 0; i < count; i++) {
      const parent = Math.floor(Math.random() * ids.length);
      await table.create({
        data: {
          name: `${tableName} ${i}`,
          [columnName]: ids[parent],
        },
      });
    }
  }
  return (await table.findMany()).map(
    (x: Record<string, string>) => x[idField],
  );
}
