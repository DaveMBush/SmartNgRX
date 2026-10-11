import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Signal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntityState } from '@ngrx/entity';
import { rootInjector } from '@smarttools/smart-core';
import { Observable, of } from 'rxjs';

import {
  createSmartSignal,
  provideSmartFeatureSignalEntities,
  provideSmartNgRX,
  SmartArray,
} from '../index';

/**
 * Regression test (SIGNALS path): adding a child to one (plain) child array on
 * a parent row that ALSO has a sibling VIRTUAL child field must not corrupt the
 * virtual field. Mirrors dms-material's open-positions add: `openTrades` is a
 * virtual field ({ indexes, length }), `divDeposits`/`soldTrades` are plain.
 */

interface Top {
  id: string;
  /** Virtual child field — stored as { indexes, length }, not an array. */
  openTrades: { indexes: string[]; length: number };
  /** Plain child fields — stored as string[]. */
  divDeposits: string[];
  soldTrades: string[];
}

interface OpenTradeChild {
  id: string;
  name: string;
}

interface DepChild {
  id: string;
  name: string;
}

@Injectable()
class MockTopEffectService {
  loadByIds(_: string[]): Observable<Top[]> {
    return of([
      {
        id: '1',
        openTrades: { indexes: ['ot0'], length: 1 },
        divDeposits: [],
        soldTrades: [],
      },
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
  private rows: DepChild[] = [];

  loadByIds(ids: string[]): Observable<DepChild[]> {
    return of(this.rows.filter((r) => ids.includes(r.id)));
  }

  add(row: DepChild): Observable<DepChild[]> {
    this.rows.push(row);
    return of([...this.rows]);
  }
}

const topEffectServiceToken = new InjectionToken('TopEffectService');
const openTradeChildEffectServiceToken = new InjectionToken(
  'OpenTradeChildEffectService',
);
const depChildEffectServiceToken = new InjectionToken('DepChildEffectService');

const featureName = 'tree-signals-add-with-virtual-sibling';

const topDefinition = {
  entityName: 'top',
  effectServiceToken: topEffectServiceToken,
  isInitialRow: true,
  defaultRow: (id: string) => ({
    id,
    openTrades: { indexes: [], length: 0 },
    divDeposits: [],
    soldTrades: [],
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

@Component({
  selector: 'dmb-dummy',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DummyComponent {}

/**
 * Builds the top signal with two child arrays: a virtual one (openTrades) and
 * a plain one (divDeposits), mirroring dms-material's account entity.
 *
 * @returns The top signal carrying both child-array proxies.
 */
function getTopSignal(): Signal<EntityState<Top>> {
  const selectTopEntities = createSmartSignal<Top>(featureName, 'top');
  const selectOpenTradeChildren = createSmartSignal<OpenTradeChild>(
    featureName,
    'openTradeChild',
  );
  const selectDepChildren = createSmartSignal<DepChild>(
    featureName,
    'depChild',
  );

  return createSmartSignal(selectTopEntities, [
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
      parentField: 'divDeposits',
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

describe('SmartArray (Signals) Integration - Add With Virtual Sibling', () => {
  afterEach(() => {
    rootInjector.set(undefined as unknown as EnvironmentInjector);
  });

  let selectTop: Signal<EntityState<Top>>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DummyComponent],
      providers: [
        { provide: topEffectServiceToken, useClass: MockTopEffectService },
        {
          provide: openTradeChildEffectServiceToken,
          useClass: MockOpenTradeChildEffectService,
        },
        {
          provide: depChildEffectServiceToken,
          useClass: MockDepChildEffectService,
        },
        provideSmartNgRX({}),
        provideSmartFeatureSignalEntities(featureName, [
          topDefinition,
          openTradeChildDefinition,
          depChildDefinition,
        ]),
      ],
    });
    TestBed.inject(EnvironmentInjector);
    await flushMicrotasks(4);
    selectTop = getTopSignal();
  });

  it('should add to a plain child array without corrupting the virtual sibling field', async () => {
    // Read the current top row (proxies freshly wrapped on each read).
    let top = selectTop().entities['1'];
    const openTradesBefore = top.openTrades as SmartArray<Top, OpenTradeChild>;
    expect(openTradesBefore).toHaveLength(1);

    // Add a child to the PLAIN divDeposits array, passing the proxied row —
    // exactly what dms-material's add-position.service does (it passes the
    // store row, which carries BOTH divDeposits and openTrades as live proxies).
    const dep = top.divDeposits as SmartArray<Top, DepChild>;
    dep.add!({ id: 'd1', name: 'D 1' }, top);
    await flushMicrotasks(4);

    // Re-read and verify the virtual sibling is intact (not corrupted) — this
    // is the regression. Before the fix, the live VirtualArray leaked into the
    // store and re-wrapping it on read crashed with "Cannot read properties of
    // undefined (reading 'length')".
    top = selectTop().entities['1'];
    const openTradesAfter = top.openTrades as SmartArray<Top, OpenTradeChild>;
    expect(openTradesAfter).toHaveLength(1);
    expect((openTradesAfter[0] as OpenTradeChild).id).toBe('ot0');
  });
});
