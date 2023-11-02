import { seedLocation } from './seed-location.function';
import { seedTable } from './seed-table.function';

export function seedDatabase(): void {
  const locationIds = seedLocation();
  const departmentIds = seedTable('departments', 'locationId', locationIds, 30);
  seedTable('folders', 'departmentId', departmentIds, 100);
  seedTable('sprintFolders', 'departmentId', departmentIds, 100);
  seedTable('lists', 'departmentId', departmentIds, 100);
  seedTable('docs', 'departmentId', departmentIds, 100);
}
