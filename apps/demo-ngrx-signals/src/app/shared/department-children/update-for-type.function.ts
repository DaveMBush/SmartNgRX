import { map, Observable } from 'rxjs';

import { CommonService } from './common-service.class';
import { DepartmentChild } from './department-child.interface';
import { updateId } from './update-id-function';

export function updateForType(
  service: CommonService,
  row: DepartmentChild,
  type: string,
  /* istanbul ignore next */
  idName = 'id', // this is just a default value that does not need to be tested
): Observable<DepartmentChild[]> {
  return service.update({ id: row.id, name: row.name }).pipe(
    map(function updateForTypeMapRow(rows): DepartmentChild[] {
      return updateId(rows, type, idName);
    }),
  );
}
