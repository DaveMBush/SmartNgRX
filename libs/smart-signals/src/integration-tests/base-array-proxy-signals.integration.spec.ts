import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Signal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { rootInjector } from '@smarttools/smart-core';
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

interface Child {
  id: string;
  name: string;
}

const topEffectServiceToken = new InjectionToken('ParentEffectService');
const topEffectServiceTokenWithExisting = new InjectionToken(
  'ParentEffectServiceWithExisting',
);
const childEffectServiceToken = new InjectionToken('ChildEffectService');
const childEffectServiceTokenWithExisting = new InjectionToken(
  'ChildEffectServiceWithExisting',
);
const topEntityName = 'top';
const childEntityName = 'child';
const featureName = 'tree-standard';

const topDefinition = {
  entityName: topEntityName,
  effectServiceToken: topEffectServiceToken,
  isInitialRow: true,
  defaultRow: (id: string) => ({ id, children: [] }),
};

const topDefinitionWithExisting = {
  entityName: topEntityName,
  effectServiceToken: topEffectServiceTokenWithExisting,
  isInitialRow: true,
  defaultRow: (id: string) => ({ id, children: [] }),
};

const childDefinition = {
  entityName: childEntityName,
  effectServiceToken: childEffectServiceToken,
  defaultRow: (id: string) => ({ id, name: '' }),
};

const childDefinitionWithExisting = {
  entityName: childEntityName,
  effectServiceToken: childEffectServiceTokenWithExisting,
  defaultRow: (id: string) => ({ id, name: '' }),
};

@Injectable()
class MockTopEffectService {
  loadByIds(_: string[]) {
    // Return the parent row with empty children
    return of([{ id: '1', children: [] }]);
  }
}

@Injectable()
class MockTopEffectServiceWithExisting {
  loadByIds(_: string[]) {
    // Return the parent row with empty children
    return of([{ id: '1', children: ['c1'] }]);
  }
}

@Injectable()
class MockChildEffectService {
  loadByIds(_: string[]) {
    return of([]);
  }
}

@Injectable()
class MockChildEffectServiceWithExisting {
  loadByIds(_: string[]) {
    return of([{ id: 'c1', name: 'Child 1' }]);
  }
}

@Component({
  selector: 'dmb-dummy',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DummyComponent {}

// we use a function to get these because we need to call these function
// after the smart providers have run
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

describe('SmartArray add(...) Integration (Signals)', () => {
  let selectChildren: Signal<Child[]>;
  afterEach(() => {
    rootInjector.set(undefined as unknown as EnvironmentInjector);
  });

  describe('when we add a child to an empty array', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [DummyComponent],
        providers: [
          { provide: topEffectServiceToken, useClass: MockTopEffectService },
          {
            provide: childEffectServiceToken,
            useClass: MockChildEffectService,
          },
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

    it('should add a child to an empty array', () => {
      let children = selectChildren() as Child[] & SmartArray<Top, Child>;
      children.addToStore!(
        { id: 'c1', name: 'Child 1' },
        { id: '1', children: [] },
      );
      children = selectChildren() as Child[] & SmartArray<Top, Child>;
      expect(children.length).toBe(1);
      expect(children[0].id).toBe('c1');
      expect(children[0].name).toBe('Child 1');
    });
  });

  describe('when we add a child to a pre-populated array', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [DummyComponent],
        providers: [
          {
            provide: topEffectServiceTokenWithExisting,
            useClass: MockTopEffectServiceWithExisting,
          },
          {
            provide: childEffectServiceTokenWithExisting,
            useClass: MockChildEffectServiceWithExisting,
          },
          provideSmartNgRX({}),
          provideSmartFeatureSignalEntities(featureName, [
            topDefinitionWithExisting,
            childDefinitionWithExisting,
          ]),
        ],
      });
      TestBed.inject(EnvironmentInjector);
      await flushMicrotasks(4);
      selectChildren = getSelectors();
    });
    it('should add a child to the pre-populated array', async () => {
      // Simulate user adding a parent with a child, then adding another child
      // This is a placeholder for the real-world flow, as state setup is not exposed
      // The test should focus on the API, not internal state
      let children = selectChildren() as Child[] & SmartArray<Top, Child>;
      const child1 = children[0];
      expect(child1.id).toBe('c1');
      await flushMicrotasks(4);
      children.addToStore!(
        { id: 'c2', name: 'Child 2' },
        { id: '1', children: ['c1'] },
      );
      children = selectChildren() as Child[] & SmartArray<Top, Child>;
      expect(children.length).toBe(2);
      expect(children[0].id).toBe('c1');
      expect(children[0].name).toBe('Child 1');
      expect(children[1].id).toBe('c2');
      expect(children[1].name).toBe('Child 2');
    });
  });
});
