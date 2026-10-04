import { EnvironmentInjector, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntityState } from '@ngrx/entity';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { rootInjector } from '@smarttools/smart-core';
import { Observable, of } from 'rxjs';

import {
  createSmartSelector,
  provideSmartFeatureClassicEntities,
  provideSmartNgRX,
  SmartArray,
  SmartNgRXRowBase,
} from '../index';

/**
 * Regression test for #1336: adding a child to one of two child arrays on the
 * same parent row must not corrupt the other (sibling) array. The bug was that
 * `createNewParentFromParent` shallow-spread the proxied parent row, copying the
 * sibling field's live proxy object into the row dispatched back to store state;
 * on re-selection that proxy re-wrapped with lost indexes and "broke" the other
 * array.
 */

interface Top extends SmartNgRXRowBase {
  id: string;
  positionDividend: string[];
  deposit: string[];
}

interface PdChild extends SmartNgRXRowBase {
  id: string;
  name: string;
}

interface DepChild extends SmartNgRXRowBase {
  id: string;
  name: string;
}

@Injectable()
class MockParentEffectService {
  loadByIds(_: string[]): Observable<Top[]> {
    return of([{ id: '1', positionDividend: ['pd0'], deposit: ['d0'] }]);
  }
}

@Injectable()
class MockPdChildEffectService {
  loadByIds(_: string[]): Observable<PdChild[]> {
    return of([{ id: 'pd0', name: 'PD 0' }]);
  }

  add(row: PdChild): Observable<PdChild[]> {
    return of([row]);
  }
}

@Injectable()
class MockDepChildEffectService {
  loadByIds(_: string[]): Observable<DepChild[]> {
    return of([{ id: 'd0', name: 'D 0' }]);
  }
}

const parentEffectServiceToken = new InjectionToken('ParentEffectService');
const pdChildEffectServiceToken = new InjectionToken('PdChildEffectService');
const depChildEffectServiceToken = new InjectionToken('DepChildEffectService');

const featureName = 'tree-classic-add-two-child-arrays';

const topDefinition = {
  entityName: 'top',
  effectServiceToken: parentEffectServiceToken,
  isInitialRow: true,
  defaultRow: (id: string) => ({ id, positionDividend: [], deposit: [] }),
};

const pdChildDefinition = {
  entityName: 'pdChild',
  effectServiceToken: pdChildEffectServiceToken,
  defaultRow: (id: string) => ({ id, name: '' }),
};

const depChildDefinition = {
  entityName: 'depChild',
  effectServiceToken: depChildEffectServiceToken,
  defaultRow: (id: string) => ({ id, name: '' }),
};

function getParentSelector(): MemoizedSelector<object, EntityState<Top>> {
  const selectTopEntities = createSmartSelector<Top>(featureName, 'top');
  const selectPdChildren = createSmartSelector<PdChild>(featureName, 'pdChild');
  const selectDepChildren = createSmartSelector<DepChild>(
    featureName,
    'depChild',
  );

  // One selector that wraps BOTH child arrays as proxies on the parent row.
  return createSmartSelector(selectTopEntities, [
    {
      childFeature: featureName,
      childEntity: 'pdChild',
      parentField: 'positionDividend',
      parentFeature: featureName,
      parentEntity: 'top',
      childSelector: selectPdChildren,
    },
    {
      childFeature: featureName,
      childEntity: 'depChild',
      parentField: 'deposit',
      parentFeature: featureName,
      parentEntity: 'top',
      childSelector: selectDepChildren,
    },
  ]);
}

async function flushMicrotasks(times = 2): Promise<void> {
  let p = Promise.resolve();
  for (let i = 0; i < times; i++) {
    p = p.then(async () => Promise.resolve());
  }
  return p;
}

describe('SmartArray (Classic NgRX) Integration - Add with Two Child Arrays', () => {
  afterEach(() => {
    rootInjector.set(undefined as unknown as EnvironmentInjector);
  });

  let store: Store;
  let selectTopChildren: MemoizedSelector<object, EntityState<Top>>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: parentEffectServiceToken,
          useClass: MockParentEffectService,
        },
        {
          provide: pdChildEffectServiceToken,
          useClass: MockPdChildEffectService,
        },
        {
          provide: depChildEffectServiceToken,
          useClass: MockDepChildEffectService,
        },
        provideSmartNgRX(),
        provideSmartFeatureClassicEntities(featureName, [
          topDefinition,
          pdChildDefinition,
          depChildDefinition,
        ]),
      ],
    });
    store = TestBed.inject(Store);
    await flushMicrotasks(4);
    selectTopChildren = getParentSelector();
  });

  it('should add to one child array without corrupting the sibling array', async () => {
    let added = false;

    await new Promise<void>((resolve, reject) => {
      // Guard so a corrupted sibling that never resolves fails the test instead
      // of hanging (the #1336 bug left the proxy permanently broken).
      const timeout = setTimeout(() => {
        reject(new Error('Timed out: sibling array did not resolve after add'));
      }, 4000);

      store.select(selectTopChildren).subscribe({
        next: (tops) => {
          if (
            tops.ids.length !== 1 ||
            tops.entities[tops.ids[0]] === undefined
          ) {
            return;
          }
          // Always read the CURRENT emission's row: after `.add()` the store
          // re-emits a fresh entity with freshly-wrapped proxies, so any earlier
          // reference is stale.
          const top = tops.entities[tops.ids[0]];
          const pd = top.positionDividend as SmartArray<Top, PdChild>;
          const dep = top.deposit as SmartArray<Top, DepChild>;

          if (!added) {
            // Wait until both arrays are populated before adding, so the proxies
            // hold real data (mirrors the add-with-existing-rows test).
            if (pd.length === 0 || dep.length === 0) {
              return;
            }
            // The parent row from the selector has BOTH child fields as live
            // proxies. Passing it straight into `.add()` is what #1336 broke:
            // the sibling proxy got copied into store state.
            pd.add({ id: 'pd1', name: 'PD 1' }, top);
            added = true;
            return;
          }

          // Child rows load asynchronously through the effect pipeline, so wait
          // until both arrays have fully-resolved data before asserting.
          if (pd.length !== 2 || pd[0].name === '' || dep[0].name === '') {
            return;
          }

          try {
            // The array we added to must contain the new child in order.
            expect(pd).toHaveLength(2);
            expect(pd[0].id).toBe('pd0');
            expect(pd[0].name).toBe('PD 0');
            expect(pd[1].id).toBe('pd1');
            expect(pd[1].name).toBe('PD 1');

            // The sibling array must be intact: this is what #1336 broke.
            expect(dep).toHaveLength(1);
            expect(dep[0].id).toBe('d0');
            expect(dep[0].name).toBe('D 0');

            clearTimeout(timeout);
            resolve();
          } catch (e) {
            clearTimeout(timeout);
            reject(e);
          }
        },
        error: (err: unknown) => {
          clearTimeout(timeout);
          reject(err);
        },
      });
    });
  });
});
