export function filterIds(ids: string[], prefix: string): string[] {
  return ids
    .filter(function filterIdsFilter(id) {
      return id.startsWith(prefix);
    })
    .map(function filterIdsMap(id) {
      return id.split(':')[1];
    });
}
