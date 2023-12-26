export function filterIds(ids: string[], prefix: string): string[] {
  return ids
    .filter((id) => id.startsWith(prefix))
    .map((id) => id.split(':')[1]);
}
