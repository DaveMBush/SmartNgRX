/**
 * Used by unit tests
 *
 * @param id The id to convert to a name
 * @returns the converted Id
 */
export function convertEntityIdToName(id: string): string {
  return id.charAt(0).toUpperCase() + id.replace('-', ' ').slice(1);
}
