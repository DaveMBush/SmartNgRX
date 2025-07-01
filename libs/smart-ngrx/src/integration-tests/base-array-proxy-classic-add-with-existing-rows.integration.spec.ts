import { EnvironmentInjector, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { rootInjector } from '@smarttools/smart-core';
import { of, Subject } from 'rxjs';

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
class MockParentEffectService {
  loadByIds(_: string[]) {
    // Return the parent row with an existing child
    return of([{ id: '1', children: ['c0'] }]);
  }
}

@Injectable()
class MockChildEffectService {
  loadByIds(_: string[]) {
    // Return the existing child row
    return of([{ id: 'c0', name: 'Child 0' }]);
  }

  add(_: Child) {
    // Add returns the new child row
    return of([{ id: 'c1', name: 'Child 1' }]);
  }
}

const parentEffectServiceToken = new InjectionToken('ParentEffectService');
const childEffectServiceToken = new InjectionToken('ChildEffectService');

const parentEntityName = 'top';
const childEntityName = 'child';
const featureName = 'tree-classic-add-with-existing';

const topDefinition = {
  entityName: parentEntityName,
  effectServiceToken: parentEffectServiceToken,
  isInitialRow: true,
  defaultRow: (id: string) => ({ id, children: [] }),
};

const childDefinition = {
  entityName: childEntityName,
  effectServiceToken: childEffectServiceToken,
  defaultRow: (id: string) => ({ id, name: '' }),
};

function getSelectors(): MemoizedSelector<
  object,
  Child[] & SmartArray<Top, Child>
> {
  const selectTopEntities = createSmartSelector<Top>(featureName, 'top');
  const selectChildren = createSmartSelector<Child>(featureName, 'child');
  const selectTopChildren = createSmartSelector(selectTopEntities, [
    {
      childFeature: featureName,
      childEntity: 'child',
      parentField: 'children',
      parentFeature: featureName,
      parentEntity: 'top',
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

describe('SmartArray (Classic NgRX) Integration - Add with Existing Rows', () => {
  afterEach(() => {
    rootInjector.set(undefined as unknown as EnvironmentInjector);
  });

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
          provide: parentEffectServiceToken,
          useClass: MockParentEffectService,
        },
        {
          provide: childEffectServiceToken,
          useClass: MockChildEffectService,
        },
        provideSmartNgRX(),
        provideSmartFeatureClassicEntities(featureName, [
          topDefinition,
          childDefinition,
        ]),
      ],
    });
    store = TestBed.inject(Store);
    await flushMicrotasks(4);
    selectChildren = getSelectors();
  });

  let added = false;
  const finished = new Subject<boolean>();
  let doneFlag = false;
  it('should add a child to a parent with existing children using Add(...)', () => {
    store.select(selectChildren).subscribe((children) => {
      if (children.add === undefined) {
        return;
      }
      if (children.length === 0) {
        return;
      }
      if (!added) {
        children.add(
          { id: 'c1', name: 'Child 1' },
          { id: '1', children: ['c0'] },
        );
        added = true;
        return;
      }
      if (children.length === 1) {
        return;
      }
      expect(children.length).toBe(2);
      const child1 = children[0];
      expect(child1.id).toBe('c0');
      expect(child1.name).toBe('Child 0');
      const child2 = children[1];
      expect(child2.id).toBe('c1');
      expect(child2.name).toBe('Child 1');
      if (!doneFlag) {
        finished.next(true);
        finished.complete();
        doneFlag = true;
      }
    });
  });
});
