import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

export function addIsDirty(rows: SmartNgRXRowBase[]): SmartNgRXRowBase[] {
  return rows.map((row) => {
    row.isDirty = false;
    return row;
  });
}
