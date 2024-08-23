export function idToString(idField: string = 'id'): (
  p: Record<string, Date | string>,
) => {
  id: string;
  created: Date;
} {
  return (p: Record<string, Date | string>): { id: string; created: Date } => {
    return {
      id: p[idField] as string,
      created: p.created as Date,
    };
  };
}
