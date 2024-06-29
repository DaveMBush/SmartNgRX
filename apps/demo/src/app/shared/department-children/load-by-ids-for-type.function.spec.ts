import { map, Observable, of, timer } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';

import { List } from '../lists/list.interface';
import { CommonService } from './common-service.class';
import { DepartmentChild } from './department-child.interface';
import { loadByIdsForType } from './load-by-ids-for-type.function';

function loadByIds(ids: string[]): Observable<List[]> {
  return of(ids.map((id) => ({ id, name: 'Dept' + id, children: [] })));
}

describe('loadByIdsForType', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load and map items successfully', () => {
    testScheduler.run(({ expectObservable }) => {
      const mockService = {
        loadByIds,
      } as CommonService;
      const ids = ['1'];
      const type = 'department';

      const result = loadByIdsForType(mockService, ids, type);

      const expectedOutput: DepartmentChild[] = [
        { id: 'department:1', name: 'Dept1', children: [] },
      ];

      expectObservable(result).toBe('(a|)', { a: expectedOutput });
    });
  });

  it('should return an empty array on timeout', () => {
    testScheduler.run(({ expectObservable }) => {
      const mockService = castTo<CommonService>({
        loadByIds: (ids: string[]) =>
          timer(1500).pipe(
            map(() => ids),
            map((id) => ({ id, name: 'Dept' + id, children: [] })),
          ),
      });
      const ids = ['1'];
      const type = 'department';

      const result = loadByIdsForType(mockService, ids, type);

      expectObservable(result).toBe('1000ms (a|)', { a: [] });
    });
  });
});
