import { seedLocation } from './seed-location.function';
import { seedTable } from './seed-table.function';

export function seedDatabase(): void {
  const locationIds = seedLocation();
  seedTable('departments', 'locationId', locationIds, 30);
}
