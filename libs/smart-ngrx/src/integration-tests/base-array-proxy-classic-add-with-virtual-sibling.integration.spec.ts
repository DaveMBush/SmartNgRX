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
 * Regression test: adding a child to one (plain) child array on a parent row
 * that ALSO has a sibling VIRTUAL child field must not corrupt the virtual
 * field. The bug was that `createNewParentFromParent` shallow-spread the
 * proxied parent row, copying the sibling field's live VirtualArray instance
 * into the row dispatched back to store state; on re-selection
 * `convertChildrenToVirtualArray` wrapped that instance again (double-wrap) and
 * crashed reading `.indexes`. This mirrors dms-material's open-positions add:
 * `openTrades` is a virtual field, `divDeposits`/`positionDividends` are plain.
 */

interface Top extends SmartNgRXRowBase {
  /** Virtual child field — stored as { indexes, length }, not an array. */
  openTrades: { indexes: string[]; length: number };
  /** Plain child field — stored as a string[]. */
  deposit: string[];
}

interface OpenTradeChild extends SmartNgRXRowBase {
  name: string;
}

interface DepChild extends SmartNgRXRowBase {
  name: string;
}

@Injectable()
class MockParentEffectService {
  loadByIds(_: string[]): Observable<Top[]> {
    // openTrades is a VIRTUAL field (non-array contents); deposit is plain.
    return of([
      { id: '1', openTrades: { indexes: ['ot0'], length: 1 }, deposit: [] },
    ]);
  }
}

@Injectable()
class MockOpenTradeChildEffectService {
  loadByIds(_: string[]): Observable<OpenTradeChild[]> {
    return of([{ id: 'ot0', name: 'OT 0' }]);
  }
}

@Injectable()
class MockDepChildEffectService {
  loadByIds(_: string[]): Observable<DepChild[]> {
    return of([]);
  }

  add(row: DepChild): Observable<DepChild[]> {
    return of([row]);
  }
}

const parentEffectServiceToken = new InjectionToken('ParentEffectService');
const openTradeChildEffectServiceToken = new InjectionToken(
  'OpenTradeChildEffectService',
);
const depChildEffectServiceToken = new InjectionToken('DepChildEffectService');

const featureName = 'tree-classic-add-with-virtual-sibling';

const topDefinition = {
  entityName: 'top',
  effectServiceToken: parentEffectServiceToken,
  isInitialRow: true,
  defaultRow: (id: string) => ({
    id,
    openTrades: { indexes: [], length: 0 },
    deposit: [],
  }),
};

const openTradeChildDefinition = {
  entityName: 'openTradeChild',
  effectServiceToken: openTradeChildEffectServiceToken,
  defaultRow: (id: string) => ({ id, name: '' }),
};

const depChildDefinition = {
  entityName: 'depChild',
  effectServiceToken: depChildEffectServiceToken,
  defaultRow: (id: string) => ({ id, name: '' }),
};

/**
 * Builds the parent selector with two child arrays: a virtual one (openTrades)
 * and a plain one (deposit), mirroring dms-material's account entity.
 *
 * @returns The memoized parent selector carrying both child-array proxies.
 */
function getParentSelector(): MemoizedSelector<object, EntityState<Top>> {
  const selectTopEntities = createSmartSelector<Top>(featureName, 'top');
  const selectOpenTradeChildren = createSmartSelector<OpenTradeChild>(
    featureName,
    'openTradeChild',
  );
  const selectDepChildren = createSmartSelector<DepChild>(
    featureName,
    'depChild',
  );

  // One selector that wraps BOTH child fields as proxies on the parent row.
  return createSmartSelector(selectTopEntities, [
    {
      childFeature: featureName,
      childEntity: 'openTradeChild',
      parentField: 'openTrades',
      parentFeature: featureName,
      parentEntity: 'top',
      childSelector: selectOpenTradeChildren,
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

/**
 * Flushes pending microtasks so async store updates settle.
 *
 * @param times - Number of microtask rounds to flush.
 * @returns Resolves once the requested number of microtask rounds have run.
 */
async function flushMicrotasks(times = 2): Promise<void> {
  let p = Promise.resolve();
  for (let i = 0; i < times; i++) {
    p = p.then(async () => Promise.resolve());
  }
  return p;
}

describe('SmartArray (Classic NgRX) Integration - Add With Virtual Sibling', () => {
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
          provide: openTradeChildEffectServiceToken,
          useClass: MockOpenTradeChildEffectService,
        },
        {
          provide: depChildEffectServiceToken,
          useClass: MockDepChildEffectService,
        },
        provideSmartNgRX(),
        provideSmartFeatureClassicEntities(featureName, [
          topDefinition,
          openTradeChildDefinition,
          depChildDefinition,
        ]),
      ],
    });
    store = TestBed.inject(Store);
    await flushMicrotasks(4);
    selectTopChildren = getParentSelector();
  });

  it('should add to a plain child array without corrupting the virtual sibling field', async () => {
    let added = false;

    await new Promise<void>((resolve, reject) => {
      // Guard so a corrupted virtual sibling that never resolves fails the test
      // instead of hanging (the bug left the proxy permanently broken).
      const timeout = setTimeout(() => {
        reject(
          new Error('Timed out: virtual sibling did not resolve after add'),
        );
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
          const openTrades = top.openTrades as SmartArray<Top, OpenTradeChild>;
          const dep = top.deposit as SmartArray<Top, DepChild>;

          if (!added) {
            // Wait until the virtual sibling is populated before adding, so the
            // proxy holds real data (mirrors dms-material: openTrades has rows).
            if (openTrades.length === 0) {
              return;
            }
            added = true;
            try {
              dep.add({ id: 'd1', name: 'D 1' }, top);
            } catch (e) {
              clearTimeout(timeout);
              reject(e);
            }
            // The add triggers a re-emission; assert on the NEXT emission(s).
          }

          // Child rows load asynchronously through the effect pipeline, so wait
          // until both arrays have fully-resolved data before asserting.
          if (dep.length !== 1 || openTrades.length !== 1) {
            return;
          }

          try {
            // The virtual sibling field must be intact: this is what the bug
            // broke — the live VirtualArray instance leaked into state and was
            // double-wrapped on re-select.
            expect(openTrades[0].id).toBe('ot0');
            // The array we added to must contain the new child.
            expect(dep[0].id).toBe('d1');

            clearTimeout(timeout);
            resolve();
          } catch (e) {
            clearTimeout(timeout);
            reject(e);
          }
        },
        error: (err: unknown) => {
          // A re-selection crash (double-wrap of the leaked VirtualArray
          // instance) surfaces here as an observable error.
          clearTimeout(timeout);
          reject(err);
        },
      });
    });
  });
});
