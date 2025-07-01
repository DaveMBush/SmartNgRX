import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Signal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { rootInjector, SmartNgRXRowBase } from '@smarttools/smart-core';
import { of } from 'rxjs';

import {
  createSmartSignal,
  getTopChildRows,
  provideSmartFeatureSignalEntities,
  provideSmartNgRX,
  SmartArray,
} from '../index';

interface Top {
  id: string;
  children: string[];
}

interface Child extends SmartNgRXRowBase {
  id: string;
  name: string;
}

const topEffectServiceToken = new InjectionToken('ParentEffectService');
const childEffectServiceToken = new InjectionToken('ChildEffectService');
const featureName = 'tree-add-method-existing';
const topEntityName = 'top';
const childEntityName = 'child';

const topDefinition = {
  entityName: topEntityName,
  effectServiceToken: topEffectServiceToken,
  isInitialRow: true,
  defaultRow: (id: string) => ({ id, children: [] }),
};
const childDefinition = {
  entityName: childEntityName,
  effectServiceToken: childEffectServiceToken,
  defaultRow: (id: string) => ({ id, name: 'Child ' + id }),
};

@Injectable()
class MockTopEffectService {
  loadByIds(_: string[]) {
    // Parent has one child already
    return of([{ id: '1', children: ['c1'] }]);
  }
}

@Injectable()
class MockChildEffectService {
  loadByIds(_: string[]) {
    // Return the existing child
    return of([{ id: 'c1', name: 'Child 1' }]);
  }

  add(_: Child) {
    // Add returns the new child with the existing child
    return of([{ id: 'c2', name: 'Child 2' }]);
  }
}

@Component({
  selector: 'dmb-dummy',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DummyComponent {}

function getSelectors(): Signal<Child[]> {
  const selectTopEntities = createSmartSignal<Top>(featureName, 'top');
  const selectChildren = createSmartSignal<Child>(featureName, 'child');
  const selectTopChildren = createSmartSignal(selectTopEntities, [
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

describe('SmartArray Add(...) Integration (Signals) with Existing Rows', () => {
  let selectChildren: Signal<Child[]>;
  afterEach(() => {
    rootInjector.set(undefined as unknown as EnvironmentInjector);
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DummyComponent],
      providers: [
        { provide: topEffectServiceToken, useClass: MockTopEffectService },
        { provide: childEffectServiceToken, useClass: MockChildEffectService },
        provideSmartNgRX({}),
        provideSmartFeatureSignalEntities(featureName, [
          topDefinition,
          childDefinition,
        ]),
      ],
    });
    TestBed.inject(EnvironmentInjector);
    await flushMicrotasks(4);
    selectChildren = getSelectors();
  });

  it('should add a child to an array with existing rows using Add(...)', async () => {
    // Simulate user adding a parent and then a child through the public API
    let children = selectChildren() as Child[] & SmartArray<Top, Child>;
    await flushMicrotasks(4);
    expect(children.length).toBe(1);
    let child1 = children[0];
    // Use the Add(...) method (public API)
    children.add!(
      { id: 'newChild', name: 'Child 2' },
      { id: '1', children: [{ id: 'c1', name: 'Child 1' }] },
    );
    await flushMicrotasks(4);
    children = selectChildren() as Child[] & SmartArray<Top, Child>;
    expect(children.length).toBe(2);
    child1 = children[0];
    child1 = children[0];
    const child2 = children[1];
    expect(child1.id).toBe('c1');
    expect(child1.name).toBe('Child c1');
    expect(child2.id).toBe('c2');
    expect(child2.name).toBe('Child 2');
  });
});
