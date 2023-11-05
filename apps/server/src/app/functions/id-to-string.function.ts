export function idToString(
  idField: string = 'id',
): (p: Record<string, string>) => string {
  return (p: Record<string, string>): string => {
    return p[idField];
  };
}
