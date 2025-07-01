import { EnvironmentInjector, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { rootInjector } from '@smarttools/smart-core';
import { of, Subject, takeUntil } from 'rxjs';

import {
  createSmartSelector,
  getTopChildRows,
  provideSmartFeatureClassicEntities,
  provideSmartNgRX,
  SmartArray,
  SmartNgRXRowBase,
} from '../index';

interface Top extends SmartNgRXRowBase {
  id: string;
  children: string[];
}

interface Child extends SmartNgRXRowBase {
  id: string;
  name: string;
}

@Injectable()
class MockChildEffectServiceWithExisting {
  loadByIds(_: string[]) {
    return of([{ id: 'c1', name: 'Child 1' }]);
  }
}

// Mock effect service that returns the parent row from loadByIds
@Injectable()
class MockParentEffectServiceWithExisting {
  loadByIds(_: string[]) {
    // Return the parent row with empty children
    return of([{ id: '1', children: ['c1'] }]);
  }
}

const parentEffectServiceTokenWithExisting = new InjectionToken(
  'ParentEffectServiceWithExisting',
);
const childEffectServiceTokenWithExisting = new InjectionToken(
  'ChildEffectServiceWithExisting',
);

const parentEntityName = 'top';
const childEntityName = 'child';
const featureName = 'tree-standard';

const topDefinitionWithExisting = {
  entityName: parentEntityName + '2',
  effectServiceToken: parentEffectServiceTokenWithExisting,
  isInitialRow: true,
  defaultRow: (id: string) => ({ id, children: [] }),
};

const childDefinitionWithExisting = {
  entityName: childEntityName + '2',
  effectServiceToken: childEffectServiceTokenWithExisting,
  defaultRow: (id: string) => ({ id, name: '' }),
};

// we use a function to get these because we need to call these function
// after the smart providers have run
function getSelectors(
  modifier: string = '',
): MemoizedSelector<object, Child[] & SmartArray<Top, Child>> {
  const selectTopEntities = createSmartSelector<Top>(
    featureName,
    'top' + modifier,
  );

  const selectChildren = createSmartSelector<Child>(
    featureName,
    'child' + modifier,
  );

  const selectTopChildren = createSmartSelector(selectTopEntities, [
    {
      childFeature: featureName,
      childEntity: 'child' + modifier,
      parentField: 'children',
      parentFeature: featureName,
      parentEntity: 'top' + modifier,
      childSelector: selectChildren,
    },
  ]);

  return getTopChildRows<Top, Child>(selectTopChildren, 'children');
}

async function flushMicrotasks(times = 2): Promise<void> {
  let p = Promise.resolve();
  for (let i = 0; i < times; i++) {
    p = p.then(async () => Promise.resolve());
  }
  return p;
}

describe('SmartArray (Classic NgRX) Integration', () => {
  afterEach(() => {
    rootInjector.set(undefined as unknown as EnvironmentInjector);
  });

  describe('when we add a child to a pre-populated array', () => {
    let store: Store;
    let selectChildren: MemoizedSelector<
      object,
      Child[] & SmartArray<Top, Child>
    >;
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          {
            provide: parentEffectServiceTokenWithExisting,
            useClass: MockParentEffectServiceWithExisting,
          },
          {
            provide: childEffectServiceTokenWithExisting,
            useClass: MockChildEffectServiceWithExisting,
          },
          provideSmartNgRX(),
          provideSmartFeatureClassicEntities(featureName, [
            topDefinitionWithExisting,
            childDefinitionWithExisting,
          ]),
        ],
      });
      store = TestBed.inject(Store);
      await flushMicrotasks(4);
      selectChildren = getSelectors('2');
    });

    it('should add a child to a parent using addToStore', () => {
      let added = false;
      const finished = new Subject<boolean>();
      let doneFlag = false;
      store
        .select(selectChildren)
        .pipe(takeUntil(finished))
        .subscribe((children) => {
          if (children.addToStore === undefined) {
            return;
          }
          if (!added) {
            children.addToStore(
              { id: 'c2', name: 'Child 2' },
              { id: '1', children: ['c1'] },
            );
            added = true;
            return;
          }
          expect(children.length).toBe(2);
          const child1 = children[0];
          expect(child1.id).toBe('c1');
          expect(child1.name).toBe('Child 1');
          expect(children[1].id).toBe('c2');
          expect(children[1].name).toBe('Child 2');
          if (!doneFlag) {
            doneFlag = true;
            finished.next(true);
            finished.complete();
          }
        });
    });
  });
});
