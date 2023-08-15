/**
 * Used by unit tests
 * @param id
 * @returns
 */
export function convertEntityIdToName(id: string): string {
  return id.charAt(0).toUpperCase() + id.replace('-', ' ').slice(1);
}
