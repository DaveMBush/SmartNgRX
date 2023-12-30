import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

export function addIsDirty(rows: MarkAndDelete[]): MarkAndDelete[] {
  return rows.map((row) => {
    row.isDirty = false;
    return row;
  });
}
